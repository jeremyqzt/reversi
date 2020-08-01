#from game.models import Game
from rest_framework import permissions, views, response, status
from .customGameSerializer import gameSerializer
from .reversi import gridLocation
import json
from .timer import ReversiTimer

class gameViewSet(views.APIView):
    def get(self, request):
        username = str(request.user)
        reqs = request.query_params
        getGrid, getTurn, getGameOver = (False, False, False)
        getGrid = "grid" in reqs and True or getGrid
        getTurn = "turn" in reqs and True or getTurn
        getGameOver = "over" in reqs and True or getGameOver
        #Always returns Move ID regardless
        serializer = gameSerializer()
        gid = serializer.getGidFromUser(username)
        if "room" in gid:
            gid = gid["room"]
        else:
            return response.Response({"error": "No Room"}, status=status.HTTP_404_NOT_FOUND)

        game = serializer.getGameFromGid(gid)
        if ({} == game.additional):
            return response.Response({"status": "Awaiting Start"}, status=status.HTTP_200_OK)

        ret = {}
        ret["move"] = game.move
        ret["users"] = game.additional["users"]
        ret["room"] = game.additional["room"]
        ret["you"] = username
        ret["lastMove"] = game.last
        ret["lastFlip"] = game.turned
        ret["lastTurn"] = game.lastTurn
        ret["whiteTimeLeft"] = game.whiteTimeRemain
        ret["blackTimeLeft"] = game.blackTimeRemain

        if (game.turn == 1):
            ret["blackTimeLeft"] = ret["blackTimeLeft"] - (ReversiTimer.getDifference(game.moveTime))
        else:
            ret["whiteTimeLeft"] = ret["blackTimeLeft"] - (ReversiTimer.getDifference(game.moveTime))

        if getGrid:
            ret["grid"] = game.grid
        if getTurn:
            ret["turn"] = game.turn
        if getGameOver:
            ret["over"] = game.over

        return response.Response({"game": ret}, status=status.HTTP_200_OK)
    def post(self, request):
        if (not "row" in request.data) or (not "col" in request.data):
            return Response(None, status=status.HTTP_404_NOT_FOUND)
        username = str(request.user)
        row = int(request.data["row"])
        col = int(request.data["col"])
        move = gridLocation(row, col)
        serializer = gameSerializer()
        gid = serializer.getGidFromUser(username)
        if "room" in gid:
            gid = gid["room"]
        else:
            return response.Response({"error": "No Room"}, status=status.HTTP_404_NOT_FOUND)
        ret = serializer.makeMoveWithGid(gid, move, username)
        return response.Response({"game": ret}, status=status.HTTP_200_OK) 

class gameStartView(views.APIView):
    def post(self, request):
        username = str(request.user)
        serializer = gameSerializer()
        gid = serializer.getGidFromUser(username)
        if "room" in gid:
            gid = gid["room"]
        else:
            return response.Response({"error": "No Room"}, status=status.HTTP_404_NOT_FOUND)
        ret = serializer.startGame(gid, username)
        return response.Response({}, status=status.HTTP_200_OK) 