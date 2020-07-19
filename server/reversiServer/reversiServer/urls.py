from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.views import serve
from django.views.generic import RedirectView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/', include('game.urls')),
    path('auth/', include('login.urls')),
    path('lobby/', include('lobby.urls')),
    path('admin/', admin.site.urls),
] + static(settings.STATIC_URL, document_root="/")
