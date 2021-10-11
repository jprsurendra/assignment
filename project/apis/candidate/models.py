from django.db import models

from apis.common.models import AbstractDateTime, City


class Candidate(AbstractDateTime):
    '''
     Candidate's Model
    '''
    candidate_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    owner_info = models.CharField(max_length=100, null=True, blank=True)
    employee_size = models.IntegerField(default=0)

    class Meta:
        db_table = 'tbl_candidate'

    def __unicode__(self):
        return "Candidate-{%s-%s}"%(self.id,self.candidate_name)
