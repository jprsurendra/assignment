from django.conf.urls import url
from rest_framework import routers

from apis.candidate.views import CandidateViewSet

router = routers.DefaultRouter()
router.register(r'candidate', CandidateViewSet)

urlpatterns = router.urls
urlpatterns += [
    # url(r'^candidate/$', CandidateViewSet.as_view()),
]
