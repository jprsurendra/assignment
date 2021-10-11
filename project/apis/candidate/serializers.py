

from rest_framework import serializers

from apis.candidate.models import Candidate
from apis.common.serializers import CitySerializer


class CandidateReadSerializer(serializers.ModelSerializer):
    candidate_name = serializers.SerializerMethodField()
    city = CitySerializer()

    class Meta:
        model = Candidate
        fields = '__all__'

    def get_candidate_name(self, obj):
        output = ''.join(x for x in obj.candidate_name.title() if x.isalnum())
        return output[0].lower() + output[1:]