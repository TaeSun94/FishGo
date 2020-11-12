from .models import Fish, User_Fish, Spot
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
            "image2",
            "recipe",
        ]


class UserFishSerializer(serializers.ModelSerializer):
    fish = FishSerializer(read_only=True, many=False)
    img = serializers.ImageField(use_url=True)

    class Meta:
        model = User_Fish
        fields = [
            "id",
            "user",
            "fish",
            "length",
            "lat",
            "lng",
            "img",
            "date",
        ]


class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = [
            "id",
            "lat",
            "lng",
        ]

class SpotDetailSerializer(serializers.ModelSerializer):
    fishes = FishSerializer(read_only=True, many=True)
    class Meta:
        model = Spot
        fields = [
            "id",
            "name",
            "lat",
            "lng",
            "tide",
            "depth",
            "fishes",
        ]

class UserFishSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Fish
        fields = [
            "id",
            "lat",
            "lng",
        ]