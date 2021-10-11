from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.pagination import PageNumberPagination

from apis.candidate.models import Candidate





class ResultsSetPagination(PageNumberPagination):
    page_size = 0
    page_size_query_param = 'page_size'
    max_page_size = 10000

class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


def format_data(result):
    '''
	    Method use for formatting data in django generic and viewset apis
	'''
    if result.status_code in [200, 201]:
        status = True
    else:
        status = False

    data = {
        'status': status,
        'status_code': result.status_code,
        'data': result.data
    }
    result.data = data

    return result


class BaseModelViewSet(viewsets.ModelViewSet):

    def dispatch(self, *args, **kwargs):
        result = super(BaseModelViewSet, self).dispatch(*args, **kwargs)
        data = format_data(result)
        return data

class CandidateViewSet(BaseModelViewSet):
    '''
    This class Handles all operation of Candidate
    '''
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Candidate.objects.all()
    serializer_class = DocumentSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DocumentFilter
    pagination_class = ResultsSetPagination
