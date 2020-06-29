from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import ReversiTokenObtainPairSerializer, ReversiUserSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = ReversiTokenObtainPairSerializer


class CreateReversiUser(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request, format='json'):
        inputData = request.data
        inputData["username"] = inputData["email"]
        print(inputData)
        serializer = ReversiUserSerializer(data=inputData)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, format='json'):
        inputData = request.data
        serializer = ReversiUserSerializer(data=inputData)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)