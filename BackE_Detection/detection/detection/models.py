from django.db import models

# Create your models here.
class Detection(models.Model):
    fish_name = models.CharField(max_length=100)
    probabilities = models.FloatField()