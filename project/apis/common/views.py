
# Create your views here.
from rest_framework import viewsets, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.pagination import PageNumberPagination

from django_filters import rest_framework as filters

from django.core.cache import cache

from apis.common.serializers import CountrySerializer, CitySerializer
from apis.common.filters import CountryFilter, CityFilter
from apis.common.models import Country, City


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




'''
This class handles all operations of Country.
Methods:
    Update:PUT
    Create:POST
    List:GET,
    Retrieve: GET(with pk(id) of object in url)
    Delete:Delete
'''
class CountryViewSet(BaseModelViewSet):
    queryset = Country.objects.all().order_by('country_name')
    serializer_class = CountrySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = CountryFilter
    pagination_class = ResultsSetPagination

    def get_queryset(self):
        if 'country' in cache:
            return cache.get('country')
        else:
            cache.set('country', self.queryset)
            return self.queryset



'''
This class handles all operations of city.
Methods:
    Update:PUT
    Create:POST
    List:GET,
    Retrieve: GET(with pk(id) of object in url)
    Delete:Delete 
'''
class CityViewSet(BaseModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filter_class = CityFilter
    pagination_class = ResultsSetPagination

    # def get_queryset(self):
    #     country = self.request.query_params.get('country',None)
    #     city_name = self.request.query_params.get('city_name',None)
    #     not_check_for_country = self.request.query_params.get('not_check_for_country',None)
    #
    #     if country and city_name:
    #         return self.queryset
    #
    #     if city_name and not country:
    #         if not_check_for_country:
    #             return self.queryset
    #         else:
    #             return City.objects.none()
    #
    #     return self.queryset
