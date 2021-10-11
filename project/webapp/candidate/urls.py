from webapp.candidate import views
from django.conf.urls import include, url


urlpatterns = [
    url(r'^$', views.show_candidate),
    url('new-candidate/$', views.create_candidate),
    url(r'^candidate-detail/(?P<candidate_id>\d+)/$', views.CandidateDetail.as_view(), name="candidate_detail"),
]