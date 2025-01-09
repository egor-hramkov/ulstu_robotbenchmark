from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from ..serializers.tournament_serializer import TournamentSerializer


tournament_view_schema = extend_schema_view(
    create=extend_schema(
        summary="Создание нового соревнования", 
        responses={
            status.HTTP_200_OK: TournamentSerializer, 
        }
    ), 
    retrieve=extend_schema(
        summary="Детальная информация о конкретном соревновании", 
        responses={
            status.HTTP_200_OK: TournamentSerializer, 
        }
    ), 
    update=extend_schema(
        summary="Обновление информации о конкретном соревновании", 
        responses={
            status.HTTP_200_OK: TournamentSerializer, 
        }
    ), 
    partial_update=extend_schema(
        summary="Частичное обновление информации о конкретном соревновании", 
        responses={
            status.HTTP_200_OK: TournamentSerializer, 
        }
    ), 
    destroy=extend_schema(
        summary="Удаление конкретного соревнования", 
        responses={
            status.HTTP_200_OK: TournamentSerializer, 
        }
    ), 
    list=extend_schema(
        summary="Получение списка всех соревнований", 
        responses={
            status.HTTP_200_OK: TournamentSerializer, 
        }
    ), 
)
