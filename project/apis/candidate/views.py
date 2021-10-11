from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, permissions

from django_filters import rest_framework as filters

from apis.common.views import BaseModelViewSet, ResultsSetPagination

from apis.candidate.models import Candidate
from apis.candidate.filters import CandidateFilter
from apis.candidate.serializers import CandidateReadSerializer, CandidateSerializer



class CandidateViewSet(BaseModelViewSet):
    '''
    This class Handles all operation of Candidate
    '''
    # permission_classes = (permissions.AllowAny,)
    # authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)

    queryset = Candidate.objects.all()
    serializer_class = CandidateReadSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = CandidateFilter
    pagination_class = ResultsSetPagination


    def get_serializer_class(self, request=None, params=None, **kwargs):
        serializer_action_classes = {
            'list': CandidateReadSerializer,
            'retrieve': CandidateSerializer
        }
        if hasattr(self, 'action'):
            return serializer_action_classes.get(self.action, self.serializer_class)
        return self.serializer_class
