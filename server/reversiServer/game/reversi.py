import enum
import json
from .reversiQSet import reversiQSet
from .timer import ReversiTimer

class GridState(enum.IntEnum):
    EMPTY = 0
    BLACK = 1
    WHITE = 2
    INVALID = 3

    @staticmethod
    def getOther(state):
        if (state == GridState.BLACK):
            return GridState.WHITE
        elif (state == GridState.WHITE):
            return GridState.BLACK

        return GridState.EMPTY


class MoveDirection(enum.Enum):
    UP = 0
    DOWN = 1
    LEFT = 2
    RIGHT = 3
    UPRIGHT = 4
    DOWNRIGHT = 5
    UPLEFT = 6
    DOWNLEFT = 7

class gridLocation():
    def __init__(self, row, col):
       self.row = row
       self.col = col

    def __add__(self, val):
        return gridLocation(self.row + val[0], self.col + val[1])

    def __iadd__(self, val):
        self.row += val[0]
        self.col += val[1]
        return self
    
    def __eq__(self, val):
        if val.row == self.row and val.col == self.col:
            return True
        return False

    def __hash__(self):
        return self.row * 10 + self.col

    def __repr__(self):
        return str(self)

    def __str__(self):
        return ("R%dC%d" % (self.row, self.col))

class reversi:
    def __init__(self, grid = None, turn = None, moveId = 0, lastTurn = GridState.BLACK, over = False, additionalMeta = {}, lastMove = "", lastFlipped = [], lastMoveTime = 0, black=1800, white=1800):
        self.additionalMeta = additionalMeta

        if(grid == None):
            self.grid = self.__initBoard(8,8)
            self.__initPiece(self.grid)
        else:
            self.grid = grid
            for i in range(0, len(self.grid)):
                for j in range(0, len(self.grid[i])):
                    self.grid[i][j] = GridState(self.grid[i][j])

        if turn == None:
            self.turn = GridState.BLACK
        else:
            self.turn = GridState(turn)

        self.over = over
        self.lastTurn = lastTurn
        self.moveId = moveId

        self.extremisPieces = self.computeExtremePieces()
        self.avail = self.computeAvailable(self.turn)
        self.lastMove = lastMove
        self.lastFlipped = lastFlipped
        if(0 == lastMoveTime):
            lastMoveTime = ReversiTimer.getCurrent()
        
        self.lastMoveTime = lastMoveTime
        self.blackTimeRemain = black
        self.whiteTimeRemain = white

    def getTurn(self):
        return self.turn

    def makeMove(self, move):
        if self.over:
            return self.getCurrentQset()

        if (not self.grid[move.row][move.col] == GridState.EMPTY):
            return self.getCurrentQset()

        if str(move) in self.avail:
            return self.getCurrentQset()

        self.grid[move.row][move.col] = self.turn
        self.lastTurn = self.turn

        if (self.turn == GridState.BLACK):
            self.blackTimeRemain = self.blackTimeRemain - (ReversiTimer.getCurrent() - int(self.lastMoveTime)) + 1
        else:
            self.whiteTimeRemain = self.whiteTimeRemain - (ReversiTimer.getCurrent() - int(self.lastMoveTime)) + 1

        self.lastMoveTime = ReversiTimer.getCurrent()

        self.lastMove = str(move)
        self.lastFlipped = [str(i) for i in self.avail[move]] 

        for i in self.avail[move]:
            self.grid[i.row][i.col] = self.turn
        self.extremisPieces = self.computeExtremePieces()
        newAvail = self.computeAvailable(GridState.getOther(self.turn))

        if newAvail != {}:
            self.turn = GridState.getOther(self.turn)
            self.avail = newAvail
        else:
            self.avail = self.computeAvailable(self.turn)
            if self.avail == {}:
                self.over = True

        return reversiQSet(self.grid, self.turn, self.moveId + 1, self.lastMove, self.lastTurn, self.lastFlipped, self.over, self.additionalMeta, self.lastMoveTime, self.blackTimeRemain, self.whiteTimeRemain)

    def getCurrentQset(self):
        return reversiQSet(self.grid, self.turn, self.moveId, self.lastMove, self.lastTurn, self.lastFlipped, self.over,  self.additionalMeta, self.lastMoveTime, self.blackTimeRemain, self.whiteTimeRemain)

    def computeAvailable(self, color):
        ret = {}
        for i in self.extremisPieces:
            wouldTurnOver = self.wouldMoveTurnOverPieces(i, color)
            if len(wouldTurnOver) != 0:
                ret[i] = wouldTurnOver
        return ret

    def computerFilled(self):
        ret = []
        for row in range(0, len(self.grid)):
            for col in range(0, len(self.grid[row])):
                if (self.grid[row][col] != GridState.EMPTY):
                    ret.append(gridLocation(row,col))
        return ret

    def computeExtremePieces(self):
        ret = []
        filledSpots = self.computerFilled()
        for spot in filledSpots:
            for direction in MoveDirection:   
                newSpot = spot + self.__buildDirectionOffsets(direction)
                if not self.__isFilled(newSpot):
                    ret.append(newSpot)
        ret = list(set(ret))
        return ret

        
    def wouldMoveTurnOverPieces(self, move, color):
        if not self.__isMoveWithinBoard(move):
            return []

        ret = []
        for direction in MoveDirection:
            ret += self.__checkDirection(move, direction, color)

        return ret

    def __buildDirectionOffsets(self, direction):
        if direction == MoveDirection.UP:
            directionOffset = [1, 0] #row++, col stays same
        elif direction == MoveDirection.DOWN:
            directionOffset = [-1, 0] #row--, col stays same
        elif direction == MoveDirection.LEFT:
            directionOffset = [0, -1] #row, col--
        elif direction == MoveDirection.RIGHT:
            directionOffset = [0, 1] #row, col++
        elif direction == MoveDirection.UPRIGHT:
            directionOffset = [1, 1]
        elif direction == MoveDirection.UPLEFT:
            directionOffset = [1, -1]
        elif direction == MoveDirection.DOWNLEFT:
            directionOffset = [-1, -1]
        elif direction == MoveDirection.DOWNRIGHT:
            directionOffset = [-1, 1]
        return directionOffset

    def __checkDirection(self, move, direction, color):
        directionOffset = self.__buildDirectionOffsets(direction)
        newMove = move + directionOffset
        newMoveNext = newMove + directionOffset

        if not self.__isMoveWithinBoard(newMove) or not self.__isMoveWithinBoard(newMoveNext):
            return []

        if (self.grid[newMove.row][newMove.col] == GridState.getOther(color)):
            if (self.grid[newMoveNext.row][newMoveNext.col] == color):
                return [gridLocation(newMove.row, newMove.col)]
                
        ret = [] 
        while (self.grid[newMove.row][newMove.col] == GridState.getOther(color)):
            ret.append(gridLocation(newMove.row, newMove.col))
            newMove += directionOffset
            # at end, if we're outside, return empty
            if not self.__isMoveWithinBoard(newMove):
                return []

        #Hit a one of ours
        if (self.grid[newMove.row][newMove.col] == color):
            return ret
        return []


    def __isFilled(self, move):
        return self.__isMoveWithinBoard(move) and self.grid[move.row][move.col] != GridState.EMPTY
        
    def __isMoveWithinBoard(self, move):
        if (move.row < 0 or move.row > 7):
            return False
        if (move.col < 0 or move.col > 7):
            return False
        return True

    def __str__(self):
        ret = ""
        for i in self.grid:
            for item in i:
                ret = "%s %s" % (ret, str(int(item.value)))
            ret += "\n"
        return ret

    def __initBoard(self, x, y):
        ret = []
        row = []
        for i in range (0,x):
            for j in range (0,y):
                row.append(GridState.EMPTY)
            ret.append(row)
            row = []
        return ret

    def __initPiece(self, grid):
        grid[3][3] = grid[4][4] = GridState.WHITE
        grid[3][4] = grid[4][3] = GridState.BLACK
