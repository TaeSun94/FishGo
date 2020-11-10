from django.contrib.auth.models import User, Group
from .models import Detection
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

class DetectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Detection
        fileds = ('fish_name','probabilities')