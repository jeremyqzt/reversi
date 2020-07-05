from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from.customLobbySerializer import LobbyCreateSerializer, LobbySerializer
import shortuuid

class CreateReversiRoom(APIView):
    def post(self, request, format='json'):
        username = str(request.user)
        gid = shortuuid.uuid()
        serializer = LobbyCreateSerializer()
        return Response(gid, status=serializer.create(username, gid))

class ReversiRoom(APIView):
    def post(self, request, format='json'):
        print(request.data)
        if not "gid" in request.data:
            return Response(None, status=status.HTTP_404_NOT_FOUND)
        gid = request.data["gid"]
        username = str(request.user)
        serializer = LobbySerializer()
        serializer.join(username, gid)
        return Response(None, status=status.HTTP_202_ACCEPTED)

    def get(self, request, format='json'):
        if not "gid" in request.query_params:
            return Response(None, status=status.HTTP_404_NOT_FOUND)        
        gid = request.query_params["gid"]
        serializer = LobbySerializer()
        data = serializer.getEveryone(gid)
        return Response(data, status=status.HTTP_200_OK)