

from rest_framework import serializers

from apis.candidate.models import Candidate
from apis.common.serializers import CitySerializer

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'


class CandidateReadSerializer(serializers.ModelSerializer):
    candidate_name = serializers.SerializerMethodField()
    city = CitySerializer()

    class Meta:
        model = Candidate
        fields = '__all__'

    def get_candidate_name(self, obj):
        if obj.candidate_name:
            return obj.candidate_name.title()
        return None