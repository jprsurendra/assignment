import logging
import traceback

from django.http import Http404
from django.shortcuts import render

# Create your views here.
from requests import Response
from rest_framework import viewsets, permissions, status

from django_filters import rest_framework as filters
from rest_framework.status import HTTP_200_OK

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
            'retrieve': CandidateReadSerializer,
            'create': CandidateSerializer,
            'update': CandidateSerializer
        }
        if hasattr(self, 'action'):
            return serializer_action_classes.get(self.action, self.serializer_class)
        return self.serializer_class

    def partial_update(self, request, *args, **kwargs):
        try:
            kwargs['partial'] = True
            return self.update(request, *args, **kwargs)
        except Exception as e:
            logging.info("Path: apis/candidate/views.py Source: partial_update() Error: %s", str(e))
            logging.info(traceback.format_exc())
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={'detail': 'There was an error processing your request. Please try again later ...', })

    def destroy(self, request, *args, **kwargs):
        _status = status.HTTP_200_OK
        data={ 'message': "Request submitted successfully"}
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
        except Exception as e:
            logging.info("Path: apis/candidate/views.py Source: destroy() Error: %s", str(e))
            logging.info(traceback.format_exc())
            _status = status.HTTP_501_NOT_IMPLEMENTED
            data = {'message': "Can't complete the request there are some errors occurred. Error: %s"%(str(e)) }

        return Response(status=_status, data=data)