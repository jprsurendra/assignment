
from rest_framework import serializers

from apis.common.models import Country, City


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    country  = CountrySerializer()
    class Meta:
        model = City
        fields = '__all__'
