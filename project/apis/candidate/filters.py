
import django_filters
from django_filters import rest_framework as filters

from .models import Candidate




class CandidateFilter(filters.FilterSet):
    '''
    Filter class for country
    '''
    candidate_name = django_filters.CharFilter(method='filter_country_name')
    exact_candidate_name = django_filters.CharFilter(method='filter_exact_country_name')
    city_id=django_filters.CharFilter(method='filter_country_id')
    country_id=django_filters.CharFilter(method='filter_country_id')

    class Meta:
        model = Candidate
        fields = '__all__'


    def filter_candidate_name(self, queryset, name, value):
        if value:
            return queryset.filter(candidate_name__icontains=value)
        return queryset

    def filter_exact_candidate_name(self, queryset, name, value):
        if value:
            return queryset.filter(candidate_name= value)
        return queryset

    def filter_city_id(self, queryset, name, value):
        if value:
            return queryset.filter(city_id=value)
        return queryset

    def filter_country_id(self, queryset, name, value):
        if value:
            return queryset.filter(city__country_id=value)
        return queryset
