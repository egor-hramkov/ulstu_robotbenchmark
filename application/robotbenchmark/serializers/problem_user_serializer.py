from rest_framework import serializers
from robotbenchmark.models import ProblemUser

class ProblemUserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Соревнование-Пользователь (многие ко многим)"""

    class Meta:
        model = ProblemUser

        fields = '__all__'

        extra_kwargs = {
            'robot_panel_port': {'read_only': True}, 
            'vs_port': {'read_only': True}, 
            'webots_stream_port': {'read_only': True}, 
        }
