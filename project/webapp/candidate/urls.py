from webapp.candidate import views
from django.conf.urls import include, url


urlpatterns = [
    url('create_candidate/$', views.create_candidate),
    url('', views.show_candidate),
]