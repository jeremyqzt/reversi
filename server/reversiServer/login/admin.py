from django.contrib import admin
from .models import ReversiUser

class ReversiAdmin(admin.ModelAdmin):
    model = ReversiUser

admin.site.register(ReversiUser, ReversiAdmin)