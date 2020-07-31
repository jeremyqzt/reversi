import json

class reversiQSet:
    def __init__(self, grid, turn, move, last, lastTurn, turned, over = False, additional = {}, movetime = 0, blackTimeRemain=1800, whiteTimeRemain=1800):
        self.grid = grid
        self.turn = turn
        self.move = move
        self.over = over
        self.last = last
        self.turned = turned
        self.lastTurn = lastTurn
        self.additional = additional
        self.moveTime = movetime
        self.blackTimeRemain = blackTimeRemain
        self.whiteTimeRemain = whiteTimeRemain

    def getDict(self):
        t = {
            "grid": self.grid,
            "turn": self.turn,
            "move": self.move,
            "over": self.over,
            "last": self.last,
            "lastTurn": self.lastTurn,
            "turned": self.turned,
            "lastMoveTime": self.moveTime,
            "blackTime": self.blackTimeRemain,
            "whiteTime": self.whiteTimeRemain
            }
        t.update(self.additional)
        return t

    def __str__(self):
        return json.dumps(self.getDict())