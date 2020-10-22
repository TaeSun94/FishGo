from .models import Fish, User_Fish
from rest_framework import serializers


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    user_type = serializers.CharField()
    profile_img = serializers.URLField()


class FishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fish
        fields = [
            "id",
            "name",
            "fish_type",
            "habitat",
            "feed",
            "prohibition",
            "image",
            "edibility",
            "recipe",
        ]


class UserFishSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)
    fish = FishSerializer(read_only=True, many=False)
    class Meta:
        model = User_Fish
        fields = [
            "id",
            "user",
            "fish",
            "length",
            "lat",
            "lng",
            "date",
        ]


