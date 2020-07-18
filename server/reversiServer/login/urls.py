from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CreateReversiUser, ManageReversiUser, TempPassView
from .serializer import ReversiTempTokenObtainPairSerializer

urlpatterns = [
    path('user/create/', CreateReversiUser.as_view(), name="create_user"),
    path('user/update/', ManageReversiUser.as_view(), name="update_user"),
    path('user/delete/', ManageReversiUser.as_view(), name="delete_user"),

    path('token/temp/', TempPassView.as_view(), name="temp_user"),

    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]