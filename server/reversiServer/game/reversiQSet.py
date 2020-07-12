import json

class reversiQSet:
    def __init__(self, grid, turn, move, over = False):
        self.grid = grid
        self.turn = turn
        self.move = move
        self.over = over

    def getDict(self):
        t = {
            "grid": self.grid,
            "turn": self.turn,
            "move": self.move,
            "over": self.over
            }
        return t

    def __str__(self):
        return json.dumps(self.getDict())