from game.models import Game
from rest_framework import viewsets, permissions
from .serializer import gameSerializer

class gameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permissions_classes= [permissions.AllowAny]
    serializer_class = gameSerializer