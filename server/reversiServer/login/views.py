from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import ReversiTokenObtainPairSerializer, ReversiUserSerializer

class CreateReversiUser(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    def post(self, request, format='json'):
        inputData = request.data
        serializer = ReversiUserSerializer(data=inputData)
        if serializer.is_valid() and serializer.user_ok(inputData["email"]):
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        error = {"detail": "User Exists Already!"}
        return Response(error, status=status.HTTP_400_BAD_REQUEST)

class ManageReversiUser(APIView):
    def delete(self, request, format='json'):
        print(request.data)
        print(request.user)
        return Response({}, status=status.HTTP_200_OK)

    def put(self, request, format='json'):
        data = request.data 
        data["username"] = request.user
        serializer = ReversiUserSerializer(data=data)
        instance = serializer.update(data)
        return Response({}, status=status.HTTP_200_OK)
