from rest_framework import serializers

from robotbenchmark.models import Tournament


class TournamentSerializer(serializers.ModelSerializer):
    """Сериализатор для модель соревнования"""

    class Meta:
        model = Tournament
        fields = '__all__'
