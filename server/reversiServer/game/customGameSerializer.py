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
        game = None
        if(existingRoom != None):
            if (not "grid" in existingRoom):
                game = reversi()
            else:
                game = reversi(existingRoom["grid"], existingRoom["turn"], existingRoom["move"], existingRoom["lastTurn"], existingRoom["over"], existingRoom, existingRoom["last"], existingRoom["turned"])
        else:
            return None #No such room...
        
        ret = game.getCurrentQset()
        return ret

    def makeMoveWithGid(self, gid, move):
        model = self.Meta.model()
        #Must have a room (because lobby)
        existingRoom = model.getState(gid)
        game, ret = (None, None)
        if(existingRoom != None):
            if (not "grid" in existingRoom):
                game = reversi()
            else:
                game = reversi(existingRoom["grid"], existingRoom["turn"], existingRoom["move"], existingRoom["lastTurn"], existingRoom["over"], {}, existingRoom["last"], existingRoom["turned"])
                #game = reversi(existingRoom["grid"], existingRoom["turn"], existingRoom["move"], existingRoom["over"], {}, existingRoom["last"], existingRoom["turned"])
        else:
            return None #No such room...

        ret = game.makeMove(move).getDict()
        existingRoom.update(ret)
        model.storeStateNoUser(gid, existingRoom)
        return ret