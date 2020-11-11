from rest_framework import serializers
from . import models

from api.models import Fish, User_Fish
from .models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ["id", "username", "user_type", "profile_img", "is_active"]


# 회원가입
class CreateUserSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField()

    def create(self, validated_data):
        user = User.objects.create_user(validated_data["username"].lower(), validated_data["username"].lower(), validated_data["password"])
        user.is_active = False
        user.save()
        return user


# 로그인
class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        data["username"] = data["username"].lower()
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("정보와 맞는 값이 없습니다.")
