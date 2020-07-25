from .api import gameViewSet, gameStartView
from django.urls import path

urlpatterns = [
    path('game', gameViewSet.as_view()),
    path('game/start/', gameStartView.as_view()),

]