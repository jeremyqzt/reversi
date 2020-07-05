# from django.db import models
# We will write a custom model
import json
import requests 

db0 = {
    "name": "db0",
    "server": "127.0.0.1",
    "port": 9000
}

db1 = {
    "name": "db1",
    "server": "127.0.0.1",
    "port": 9001
}

db2 = {
    "name": "db1",
    "server": "127.0.0.1",
    "port": 9002
}

servs = [db0, db1, db2]

class dbConn:
    def __init__(self, name, ip, port):
        self.name = name
        self.ip = ip
        self.port = port

    def __str__(self):
        return "http://%s:%d" % (self.ip, self.port)


class LobbyModel:
    def __init__(self):
        self.availDb = []
        for inst in servs:
            servInstance = dbConn(inst["name"], inst["server"], inst["port"])
            self.availDb.append(servInstance)

    @staticmethod
    def getDbInst(gid):
        key = gid[0]
        if (key.isnumeric()):
            return 0
        elif (key.islower()):
            return 1
        return 2

    def getState(self, gid):
        dbId = LobbyModel.getDbInst(gid)
        server = "%s/%s/%s" % (self.availDb[dbId], "gameState", gid)
        r = requests.get(url = server)
        data = r.json()
        if (data == {} or r.status_code != 200):
            return None
        return data

    def storeState(self, gid, gameData):
        dbId = LobbyModel.getDbInst(gid)
        payload = {}
        payload["newState"] = json.dumps(gameData)
        server = "%s/%s/%s" % (self.availDb[dbId], "gameState", gid)
        r = requests.post(url = server, data = payload)
        return r.status_code
'''
t = LobbyModel()
tD = {}
tD["test"] = "asdasd"
tD["Pieces"] = [1,2,3,4,5]
t.storeState("asqweA123", tD)
z = t.getState("asqweA123")
print(z)
'''