from enum import Enum


class WebotsRosProjects(Enum):
    webots_ros2_suv = 'webots_ros2_suv'

    @classmethod
    def get_choices(cls):
        """Генерирует выбор для БД"""
        return tuple((member.name, member.value) for member in cls)
