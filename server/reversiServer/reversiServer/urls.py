from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/', include('game.urls')),
    path('login/', include('login.urls')),
    #path('admin/', admin.site.urls),
]
