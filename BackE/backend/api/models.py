from django.utils import timezone
from django.db import models
from django.conf import settings
import os

class Fish(models.Model):
    name = models.CharField(max_length=20, null=False)
    fish_type = models.CharField(max_length=20, null=False) 
    habitat = models.CharField(max_length=20, null=True)
    feed = models.CharField(max_length=50, null=True)
    prohibition = models.CharField(max_length=50, null=True)
    image = models.TextField() 
    image2 = models.TextField() 
    recipe = models.BooleanField() 
    user = models.ManyToManyField(settings.AUTH_USER_MODEL, through='User_Fish', related_name="fish_users", through_fields=('fish', 'user'))

    def __str__ (self): 
        return self.name


class User_Fish(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    fish = models.ForeignKey(Fish, on_delete=models.CASCADE, null=False)
    length = models.FloatField(max_length=15, null=True) 
    lat = models.FloatField(max_length=15, null=False) 
    lng = models.FloatField(max_length=15, null=False) 
    img = models.ImageField()
    date = models.DateTimeField(auto_now_add=True)


class Spot(models.Model):
    name = models.CharField(max_length=20, null=False)
    lat = models.FloatField(max_length=15, null=False) 
    lng = models.FloatField(max_length=15, null=False) 
    tide = models.CharField(max_length=20, null=True)
    depth = models.CharField(max_length=20, null=True)
    fishes = models.ManyToManyField(Fish, related_name='spot_fishes')

    def __str__ (self): 
        return self.name
