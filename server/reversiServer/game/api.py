#from game.models import Game
from rest_framework import permissions, views, response, status
from .customGameSerializer import gameSerializer
from .gameLogic import gameLogic
import json

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
            return response.Response({"error": "No Room"}, status=status.HTTP_404_NOT_FOUND)

        game = serializer.getGameFromGid(gid)
        ret = {}
        ret["move"] = game.move
        if getGrid:
            ret["grid"] = game.grid
        if getTurn:
            ret["turn"] = game.turn
        if getGameOver:
            ret["over"] = game.over
        return response.Response({"game": ret}, status=status.HTTP_200_OK)
    def post(self, request):
        pass
 