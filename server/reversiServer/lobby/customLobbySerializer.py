from .customLobbyModels import LobbyModel

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
        return model.storeState(gid, record)


class LobbySerializer:
    def __init__(self):
        pass

    class Meta:
        model = LobbyModel

    def join(self, user, gid):
        model = self.Meta.model()
        existingRoom = model.getState(gid)

        if(existingRoom != None):
            existingRoom["users"].append(user)
        else:
            return 404 #No such room...
        return model.storeState(gid, existingRoom)

    def getEveryone(self, gid):
        model = self.Meta.model()
        existingRoom = model.getState(gid)
        if(existingRoom != None):
            return existingRoom["users"]
        else:
            return 404
