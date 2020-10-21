from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = None
    last_name = None
    username = models.EmailField(unique=True)
    # email = models.EmailField('이메일', unique=True)
    user_type = models.CharField(max_length=20, default='default') 
    profile_img = models.TextField()
    nickname = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
