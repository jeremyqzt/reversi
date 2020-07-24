from lobby.customReversiModels import LobbyModel
from .reversi import reversi, gridLocation
from .reversiQSet import reversiQSet
from . gameErrors import GameErrors

class gameSerializer():
    def __init__(self):
        pass

    class Meta:
        model = LobbyModel

    def getGidFromUser(self, username):
        model = self.Meta.model()
        gid = model.getPlayerRoom(username)
        if gid == None:
            return {}
        gid = gid.decode("utf-8")
        existingRoom = model.getState(gid)
        if(existingRoom != None):
            return existingRoom
        else:
            return {}

    def getGameFromGid(self, gid):
        model = self.Meta.model()

        #Must have a room (because lobby)
        existingRoom = model.getState(gid)
        game = None
        if(existingRoom != None):
            if (not "grid" in existingRoom):
                game = reversi()
            else:
                game = reversi(existingRoom["grid"], existingRoom["turn"], existingRoom["move"], existingRoom["lastTurn"], existingRoom["over"], existingRoom, existingRoom["last"], existingRoom["turned"])
        else:
            return {"error": "No Room", "errCode": GameErrors.NO_ROOM.value} #No such room...
        
        ret = game.getCurrentQset()
        return ret

    def makeMoveWithGid(self, gid, move, maker):
        model = self.Meta.model()
        #Must have a room (because lobby)
        existingRoom = model.getState(gid)
        game, ret = (None, None)
        if(existingRoom != None):
            if (not "grid" in existingRoom):
                game = reversi()
            else:
                game = reversi(existingRoom["grid"], existingRoom["turn"], existingRoom["move"], existingRoom["lastTurn"], existingRoom["over"], {}, existingRoom["last"], existingRoom["turned"])
        else:
            return {"error": "No Room", "errCode": GameErrors.NO_ROOM.value} #No such room...

        # Black is 1, goes first, so idx = 0
        # white 2, goes second, idx = 1
        turnIdx = existingRoom["turn"] - 1
        if (len(existingRoom["users"]) < 2):
            return {"error": "Not Enough Players", "errCode": GameErrors.NOT_ENOUGH_PLAYER.value} #No such room...

        if (not maker in existingRoom["users"]):
            return {"error": "Not Such Player", "errCode": GameErrors.PLAYER_NOT_IN_GAME.value} #No such room...

        #print(turnIdx)
        #print(existingRoom["users"][turnIdx])
        ret = {"error": "Not Your Turn", "errCode": GameErrors.NOT_YOUR_TURN.value} #No such room...

        if (maker == existingRoom["users"][turnIdx]):
            ret = game.makeMove(move).getDict()
            existingRoom.update(ret)
            model.storeStateNoUser(gid, existingRoom)
        return ret