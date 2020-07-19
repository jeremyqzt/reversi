from django.contrib import admin
from django.urls import path, re_path, include
from django.contrib.staticfiles.views import serve
from django.views.generic import RedirectView
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic.base import TemplateView

urlpatterns = [
    path('api/', include('game.urls')),
    path('auth/', include('login.urls')),
    path('lobby/', include('lobby.urls')),
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name="index.html")),
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
] + static(settings.STATIC_URL, document_root="/")
