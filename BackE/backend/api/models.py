from django.utils import timezone
from django.db import models
from django.conf import settings

class Fish(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=20, null=False)
    fish_type = models.CharField(max_length=20, null=False) 
    habitat = models.CharField(max_length=20, null=True)
    feed = models.CharField(max_length=50, null=True)
    prohibition = models.CharField(max_length=50, null=True)
    image = models.TextField(null=False)  
    edibility = models.CharField(max_length=50, null=True) 
    recipe = models.CharField(max_length=50, null=True) 
    user = models.ManyToManyField(settings.AUTH_USER_MODEL, through='User_Fish', related_name="fish_users", through_fields=('fish', 'user'))


class User_Fish(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False)
    fish = models.ForeignKey(Fish, on_delete=models.CASCADE, null=False)
    length = models.FloatField(max_length=15, null=True) 
    lat = models.FloatField(max_length=15, null=False) 
    lng = models.FloatField(max_length=15, null=False) 
    date = models.DateTimeField(auto_now_add=True)