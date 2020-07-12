from lobby.customReversiModels import LobbyModel
from .reversi import reversi, gridLocation
from .reversiQSet import reversiQSet
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
        if(existingRoom != None):
            if (not "grid" in existingRoom):
                game = reversi()
        else:
            return None #No such room...
        
        ret = game.getCurrentQset()
        return ret

    def makeMoveWithGid(self, gid, move):
        model = self.Meta.model()
        #Must have a room (because lobby)
        existingRoom = model.getState(gid)
        if(existingRoom != None):
            if (not "grid" in existingRoom):
                game = reversi()
        else:
            return None #No such room...
        move = gridLocation(move.row, move.col)
        ret = game.getCurrentQset()
        return ret