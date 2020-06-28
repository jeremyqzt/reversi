from rest_framework import serializers
from game.models import Game

class gameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'
