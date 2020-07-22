import json

class reversiQSet:
    def __init__(self, grid, turn, move, last, lastTurn, turned, over = False, additional = {}):
        self.grid = grid
        self.turn = turn
        self.move = move
        self.over = over
        self.last = last
        self.turned = turned
        self.lastTurn = lastTurn
        self.additional = additional

    def getDict(self):
        t = {
            "grid": self.grid,
            "turn": self.turn,
            "move": self.move,
            "over": self.over,
            "last": self.last,
            "lastTurn": self.lastTurn,
            "turned": self.turned
            }
        t.update(self.additional)
        return t

    def __str__(self):
        return json.dumps(self.getDict())