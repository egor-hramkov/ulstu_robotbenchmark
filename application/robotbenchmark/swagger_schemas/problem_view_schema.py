from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from ..serializers.problem_serializer import ProblemSerializer


problem_view_schema = extend_schema_view(
    create=extend_schema(
        summary="Создание новой задачи", 
        responses={
            status.HTTP_200_OK: ProblemSerializer, 
        }
    ), 
    retrieve=extend_schema(
        summary="Детальная информация о конкретной задаче", 
        responses={
            status.HTTP_200_OK: ProblemSerializer, 
        }
    ), 
    update=extend_schema(
        summary="Обновление информации о конкретной задаче", 
        responses={
            status.HTTP_200_OK: ProblemSerializer, 
        }
    ), 
    partial_update=extend_schema(
        summary="Частичное обновление информации о конкретной задаче", 
        responses={
            status.HTTP_200_OK: ProblemSerializer, 
        }
    ), 
    destroy=extend_schema(
        summary="Удаление конкретной задачи", 
        responses={
            status.HTTP_200_OK: ProblemSerializer, 
        }
    ), 
    list=extend_schema(
        summary="Получение списка всех задач", 
        responses={
            status.HTTP_200_OK: ProblemSerializer, 
        }
    ), 
)
