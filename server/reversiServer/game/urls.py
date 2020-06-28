from rest_framework import routers
from .api import gameViewSet

router = routers.DefaultRouter()
router.register('api/game', gameViewSet, 'game')
urlpatterns = router.urls