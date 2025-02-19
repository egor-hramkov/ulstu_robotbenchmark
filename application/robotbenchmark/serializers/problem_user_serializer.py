import os
from django.conf import settings

from rest_framework import serializers
from robotbenchmark.models import ProblemUser

class ProblemUserSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Соревнование-Пользователь (многие ко многим)"""

    records = serializers.SerializerMethodField()

    class Meta:
        model = ProblemUser

        fields = '__all__'

        extra_kwargs = {
            'robot_panel_port': {'read_only': True}, 
            'vs_port': {'read_only': True}, 
            'webots_stream_port': {'read_only': True}, 
        }

    def get_records(self, obj):
        """Получает записи из media/records/<user_name>/records/"""

        # Формируем путь для конкретного пользователя
        user_name = obj.user.username + str(obj.id)
        directory = os.path.join(settings.MEDIA_ROOT, 'records', user_name, 'records')
        records_dict = {}

        # Проверяем, существует ли директория
        if os.path.exists(directory):
            # Перебираем все подпапки внутри этой директории
            for entry in os.listdir(directory):
                full_path = os.path.join(directory, entry, 'webots_animation.html')
                if os.path.isfile(full_path):  # Проверяем, чтобы файл существовал
                    # Добавляем запись в словарь: ключ — время (название папки), значение — путь
                    records_dict[entry] = os.path.join(settings.MEDIA_URL, 'records', user_name, 'records', entry,
                                                       'webots_animation.html')

        return records_dict
