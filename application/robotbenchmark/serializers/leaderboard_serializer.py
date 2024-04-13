from rest_framework import serializers


class LeaderboardSerializer(serializers.Serializer):
    """Сериализатор для лидерборда"""
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    username = serializers.CharField()
    total_points = serializers.IntegerField()

