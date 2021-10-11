from django.db import models

# class Candidate(AbstractDateTime):
#     '''
#      Candidate's Model
#     '''
#     candidate_name = models.CharField(max_length=100, null=True, blank=True)
#     address = models.CharField(max_length=100, null=True, blank=True)
#     city = models.ForeignKey(City, null=True, blank=True)
#
#     class Meta:
#         db_table = 'tbl_candidate'
#
#     def __unicode__(self):
#         return "Candidate-{%s-%s}"%(self.id,self.candidate_name)
