from .api import gameViewSet
from django.urls import path

urlpatterns = [
    path('game/', gameViewSet.as_view()),
]