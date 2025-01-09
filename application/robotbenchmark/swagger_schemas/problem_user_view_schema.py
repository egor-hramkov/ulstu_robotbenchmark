from drf_spectacular.utils import extend_schema, extend_schema_view, OpenApiParameter
from rest_framework import status
from ..serializers.problem_user_serializer import ProblemUserSerializer


problem_user_view_schema = extend_schema_view(
    create=extend_schema(
        summary="Создание новых задач конкретному пользователю", 
        responses={
            status.HTTP_200_OK: ProblemUserSerializer, 
        }
    ), 
    retrieve=extend_schema(
        summary="Детальная информация о задачах конкретного пользователя", 
        responses={
            status.HTTP_200_OK: ProblemUserSerializer, 
        }
    ), 
    update=extend_schema(
        summary="Обновление информации о задачах конкретного пользователя", 
        responses={
            status.HTTP_200_OK: ProblemUserSerializer, 
        }
    ), 
    partial_update=extend_schema(
        summary="Частичное обновление информации о задачах конкретного пользователя", 
        responses={
            status.HTTP_200_OK: ProblemUserSerializer, 
        }
    ), 
    destroy=extend_schema(
        summary="Удаление задач у конкретного пользователя", 
        responses={
            status.HTTP_200_OK: ProblemUserSerializer, 
        }
    ), 
    list=extend_schema(
        summary="Получение списка всех задач у конкретного пользователя", 
        parameters=[
            OpenApiParameter(name='user_id', required=False, description='Определённый пользователь', type=int), 
            OpenApiParameter(name='tournament_id', required=False, description='Определённый турнир', type=int), 
            OpenApiParameter(name='is_checked', required=False, description='Проверенные задачи', type=int), 
        ],
        responses={
            status.HTTP_200_OK: ProblemUserSerializer, 
        }
    ), 
)
