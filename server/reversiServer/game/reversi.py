import enum

class GridState(enum.Enum):
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

class Move():
    def __init__(self, row, col):
       self.row = row
       self.col = col
    def __add__(self, val):
        return Move(self.row + val[0], self.col + val[1])

    def __iadd__(self, val):
        self.row += val[0]
        self.col += val[1]
        return self

    def __str__(self):
        return ("%d, %d" % (self.row, self.col))
    

class reversi:
    def __init__(self, grid = [], extremis = {}):
        self.grid = self.__initBoard(8,8)
        self.extremisPieces = extremis
        self.__initPiece(self.grid, self.extremisPieces)
        # Black always first
        self.turn = GridState.BLACK
        print(self.extremisPieces)

    def makeMove(self, move):
        if (not self.grid[move.row][move.col] == GridState.EMPTY):
            return []

        turnedPieces = self.wouldMoveTurnOverPieces(move)
        
        if (turnedPieces == []): # Must turn over atleast 1 piece to be valid
            return []
        
        self.grid[move.row][move.col] = self.turn
        self.recomputeExtremis(move)
        return turnedPieces

    def recomputeExtremis(self, move):
        pass
    
    def wouldMoveTurnOverPieces(self, move):
        if not self.__isMoveWithinBoard(move):
            return []

        ret = []
        for direction in MoveDirection:
            ret += self.__checkDirection(move, direction)

        return ret

    def __checkDirection(self, move, direction):
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

        newMove = move + directionOffset
        newMoveNext = newMove + directionOffset

        if not self.__isMoveWithinBoard(newMove) or not self.__isMoveWithinBoard(newMoveNext):
            return []

            
        if (self.grid[newMove.row][newMove.col] == GridState.getOther(self.turn)):
            if (self.grid[newMoveNext.row][newMoveNext.col] == self.turn):
                return [[newMoveNext.row, newMoveNext.col]]
                
        
        ret = [] 
        while (self.grid[newMove.row][newMove.col] == GridState.getOther(self.turn)):
            ret.append([newMove.row, newMove.col])
            newMove += directionOffset

        # at end, if we're outside, return empty
        if not self.__isMoveWithinBoard(newMove):
            return []

        #Hit a one of ours
        if (self.grid[newMove.row][newMove.col] == self.turn):
            return ret

        return []

            
    def __isMoveWithinBoard(self, move):
        if (move.row < 0 and move.row > 7):
            return False
        if (move.col < 0 and move.col > 7):
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

    def __initPiece(self, grid, extremePiece):
        grid[3][3] = grid[4][4] = GridState.WHITE
        grid[3][4] = grid[4][3] = GridState.BLACK
        for i in range (2,6):
            for j in range (2,6):
                if (i == 3 and j == 3): continue
                if (i == 3 and j == 4): continue
                if (i == 4 and j == 3): continue
                if (i == 4 and j == 4): continue
                key = (i,j)
                extremePiece[key] = key
        
        

test = reversi()
move = Move(2,3)
print(test)
print(test.makeMove(move))
print(test)
