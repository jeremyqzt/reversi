from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import ReversiUser

class ReversiTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(ReversiTokenObtainPairSerializer, cls).get_token(user)
        return token
        
class ReversiUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.EmailField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = ReversiUser
        fields = ('email', 'username','password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        instance = self.Meta.model(**validated_data)
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def user_ok(self, email):
        try: 
            self.Meta.model.objects.get(email=email)
        except:
            return True
        return False
