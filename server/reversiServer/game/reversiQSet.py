import json

class reversiQSet:
    def __init__(self, grid, turn, move, last, turned, over = False, additional = {}):
        self.grid = grid
        self.turn = turn
        self.move = move
        self.over = over
        self.last = last
        self.turned = turned
        self.additional = additional

    def getDict(self):
        t = {
            "grid": self.grid,
            "turn": self.turn,
            "move": self.move,
            "over": self.over,
            "last": self.last,
            "turned": self.turned
            }
        t.update(self.additional)
        return t

    def __str__(self):
        print(self.getDict())
        return json.dumps(self.getDict())