from django.conf.urls import url
from rest_framework import routers

from apis.common.views import CountryViewSet, CityViewSet

router = routers.DefaultRouter()
router.register(r'country', CountryViewSet)
router.register(r'city', CityViewSet)

urlpatterns = router.urls
urlpatterns += [

]
