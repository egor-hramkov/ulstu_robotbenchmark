from rest_framework import serializers

from robotbenchmark.models import ProblemUser


class ProblemUserSerializer(serializers.ModelSerializer):
    """Сериализатор для модель many-to-many Соревнования-Пользователи"""

    class Meta:
        model = ProblemUser
        fields = '__all__'
