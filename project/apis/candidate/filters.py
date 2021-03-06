
import django_filters
from django_filters import rest_framework as filters

from .models import Candidate




class CandidateFilter(filters.FilterSet):
    '''
    Filter class for country
    '''
    candidate_name = django_filters.CharFilter(method='filter_candidate_name')
    address = django_filters.CharFilter(method='filter_address')
    owner_info = django_filters.CharFilter(method='filter_owner_info')
    exact_candidate_name = django_filters.CharFilter(method='filter_exact_country_name')
    city_name = django_filters.CharFilter(method='filter_city_name')
    city_id=django_filters.CharFilter(method='filter_city_id')
    country_id=django_filters.CharFilter(method='filter_country_id')

    class Meta:
        model = Candidate
        fields = '__all__'


    def filter_candidate_name(self, queryset, name, value):
        if value:
            return queryset.filter(candidate_name__icontains=value)
        return queryset

    def filter_owner_info(self, queryset, name, value):
        if value:
            return queryset.filter(owner_info__icontains=value)
        return queryset

    def filter_address(self, queryset, name, value):
        if value:
            return queryset.filter(address__icontains=value)
        return queryset

    def filter_exact_candidate_name(self, queryset, name, value):
        if value:
            return queryset.filter(candidate_name= value)
        return queryset

    def filter_city_name(self, queryset, name, value):
        if value:
            return queryset.filter(city__city_name__icontains=value)
        return queryset

    def filter_city_id(self, queryset, name, value):
        if value:
            return queryset.filter(city_id=value)
        return queryset

    def filter_country_id(self, queryset, name, value):
        if value:
            return queryset.filter(city__country_id=value)
        return queryset
