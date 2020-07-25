from .customReversiModels import LobbyModel

class LobbyCreateSerializer:
    def __init__(self):
        pass

    class Meta:
        model = LobbyModel

    def create(self, user, gid):
        record = {
            "room": gid,
            "users": [user]
        }
        model = self.Meta.model()
        code = model.storeState(gid, record, user, False)
        if code == 200:
            return model.storePlayerRoom(user, gid)
        return code
         
class LobbySerializer:
    def __init__(self):
        pass

    class Meta:
        model = LobbyModel

    def join(self, user, gid, join):
        model = self.Meta.model()
        existingRoom = model.getState(gid)
        leaving = False
        if(existingRoom != None):
            if (not join):
                existingRoom["users"].remove(user)
                leaving = True
                if (existingRoom["users"] == []):
                    existingRoom = {
                        "delete": True
                    }
            else:
                existingRoom["users"].append(user)
        else:
            return None #No such room...
        return model.storeState(gid, existingRoom, user, leaving)

    def getEveryone(self, username):
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
