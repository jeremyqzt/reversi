from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializer import ReversiTempTokenObtainPairSerializer, ReversiUserSerializer


class TempPassView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    def post(self, request, format='json'):
        serializer = ReversiTempTokenObtainPairSerializer(data=request.data)
        tok = str(serializer.get_token())
        json = {"access": tok}
        return Response(json, status=status.HTTP_200_OK)

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
        data = {"username": request.user}
        serializer = ReversiUserSerializer(data=data)
        serializer.delete(data)
        return Response({}, status=status.HTTP_200_OK)

    def put(self, request, format='json'):
        data = request.data 
        data["username"] = request.user
        serializer = ReversiUserSerializer(data=data)
        if (None != serializer.update(data)):
            return Response({}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Incorrect Old Password!"}, status=status.HTTP_401_UNAUTHORIZED)
