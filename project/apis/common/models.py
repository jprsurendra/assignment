from django.db import models

# Create your models here.
class AbstractDateTime(models.Model):
    '''
    Abstract model for created_on and updated_on field in models
    '''
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Country(models.Model):
    '''
    Country Model
    '''
    country_name = models.CharField(max_length=100)

    class Meta:
        db_table = "mst_country"

    def __unicode__(self):
        return "Country-{%s-%s}"%(self.id, self.country_name)


class City(models.Model):
    '''
        City Modal
    '''
    city_name = models.CharField(max_length=100, db_index=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

    class Meta:
        db_table = 'mst_city'

    def __unicode__(self):
        return "City-{%s-%s}"%(self.id, self.city_name)


