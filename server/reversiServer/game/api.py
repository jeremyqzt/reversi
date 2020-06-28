#from game.models import Game
from rest_framework import permissions, views, response, status
from .serializer import gameSerializer
from .gameLogic import gameLogic
from .models import Game

class gameViewSet(views.APIView):
    def get(self, request):
        serializer = gameSerializer(Game.objects.all(), many=True)
        return response.Response({"game": serializer.data})
 