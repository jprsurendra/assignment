
import django_filters
from django_filters import rest_framework as filters

from .models import City, Country




class CountryFilter(filters.FilterSet):
    '''
    Filter class for country
    '''
    country_name = django_filters.CharFilter(method='filter_country_name')
    exact_country_name = django_filters.CharFilter(method='filter_exact_country_name')
    country_id=django_filters.CharFilter(method='filter_is_country_id')

    class Meta:
        model = Country
        fields = '__all__'



    def filter_country_name(self, queryset, name, value):
        if value:
            return queryset.filter(country_name__icontains=value)
        return queryset

    def filter_exact_country_name(self, queryset, name, value):
        if value:
            return queryset.filter(country_name= value)
        return queryset

    def filter_is_country_id(self, queryset, name, value):
        if value:
            return queryset.filter(id=value)
        return queryset

class CityFilter(filters.FilterSet):
    '''
    Filter class for city
    '''
    city_name = django_filters.CharFilter(method='filter_city_name')
    exact_city_name = django_filters.CharFilter(method='filter_exact_city_name')
    city_id=django_filters.CharFilter(method='filter_is_city_id')
    country_id=django_filters.CharFilter(method='filter_country_id')

    class Meta:
        model = City
        fields = '__all__'

    def filter_city_name(self, queryset, name, value):
        if value:
            return queryset.filter(city_name__icontains=value)
        return queryset

    def filter_exact_city_name(self, queryset, name, value):
        if value:
            return queryset.filter(city_name= value)
        return queryset

    def filter_is_city_id(self, queryset, name, value):
        if value:
            return queryset.filter(id=value)
        return queryset

    def filter_country_id(self, queryset, name, value):
        if value:
            return queryset.filter(country_id=value)
        return queryset

