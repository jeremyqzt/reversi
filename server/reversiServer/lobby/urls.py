from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CreateReversiRoom, ReversiRoom

urlpatterns = [
    path('room/', ReversiRoom.as_view(), name='join_room'),
    path('createroom/', CreateReversiRoom.as_view(), name='create_room'),
]