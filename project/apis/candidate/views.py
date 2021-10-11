from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions


from apis.candidate.models import Candidate
from apis.common.views import BaseModelViewSet


class CandidateViewSet(BaseModelViewSet):
    '''
    This class Handles all operation of Candidate
    '''
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Candidate.objects.all()
    serializer_class = CandidateReadSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = DocumentFilter
    pagination_class = ResultsSetPagination
