from django.shortcuts import render
from django.contrib.auth.models import User, Group
from .models import Detection
from rest_framework import viewsets
from detection.detection.serializers import UserSerializer, GroupSerializer, DetectionSerializer

# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
 
 
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class DetectionViewSet(viewsets.ModelViewSet):
    """
    코드 여기에 작성
    """
    queryset = Detection.objects.all()
    serializer_class = DetectionSerializer
