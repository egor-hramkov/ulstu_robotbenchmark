from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from ..serializers.tournament_user_serializer import TournamentUserSerializer


tournament_user_view_schema = extend_schema_view(
    create=extend_schema(
        summary="Создание нового соревнования для конкретного пользователя", 
        responses={
            status.HTTP_200_OK: TournamentUserSerializer, 
        }
    ), 
    retrieve=extend_schema(
        summary="Детальная информация о соревнованиях конкретного пользователя", 
        responses={
            status.HTTP_200_OK: TournamentUserSerializer, 
        }
    ), 
    update=extend_schema(
        summary="Обновление информации о соревновании конкретного пользователя", 
        responses={
            status.HTTP_200_OK: TournamentUserSerializer, 
        }
    ), 
    partial_update=extend_schema(
        summary="Частичное обновление информации о соревновании конкретного пользователя", 
        responses={
            status.HTTP_200_OK: TournamentUserSerializer, 
        }
    ), 
    destroy=extend_schema(
        summary="Удаление соревнования у конкретного пользователя", 
        responses={
            status.HTTP_200_OK: TournamentUserSerializer, 
        }
    ), 
    list=extend_schema(
        summary="Получение списка всех соревнований у конкретного пользователя", 
        responses={
            status.HTTP_200_OK: TournamentUserSerializer, 
        }
    ), 
)
