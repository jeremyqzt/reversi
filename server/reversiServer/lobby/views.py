from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

class CreateReversiRoom(APIView):
    def post(self, request, format='json'):
        inputData = request.data
        serializer = ReversiUserSerializer(data=inputData)
        if serializer.is_valid() and serializer.user_ok(inputData["email"]):
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JoinReversiRoom(APIView):
    def post(self, request, format='json'):
        inputData = request.data
        serializer = ReversiUserSerializer(data=inputData)
        if serializer.is_valid() and serializer.user_ok(inputData["email"]):
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)