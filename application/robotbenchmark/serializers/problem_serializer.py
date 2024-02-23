from rest_framework import serializers

from robotbenchmark.models import Problem


class ProblemSerializer(serializers.ModelSerializer):
    """Сериализатор для модель соревнования"""

    class Meta:
        model = Problem
        fields = '__all__'
