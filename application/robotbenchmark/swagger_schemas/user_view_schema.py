from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from ..serializers.user_serializer import UserSerializer


user_view_schema = extend_schema_view(
    create=extend_schema(
        summary="Создание нового пользователя", 
        responses={
            status.HTTP_200_OK: UserSerializer, 
        }
    ), 
    retrieve=extend_schema(
        summary="Детальная информация о конкретном пользователе", 
        responses={
            status.HTTP_200_OK: UserSerializer, 
        }
    ), 
    update=extend_schema(
        summary="Обновление информации о конкретном пользователе", 
        responses={
            status.HTTP_200_OK: UserSerializer, 
        }
    ), 
    partial_update=extend_schema(
        summary="Частичное обновление информации о конкретном пользователе", 
        responses={
            status.HTTP_200_OK: UserSerializer, 
        }
    ), 
    destroy=extend_schema(
        summary="Удаление конкретного пользователя", 
        responses={
            status.HTTP_200_OK: UserSerializer, 
        }
    ), 
    list=extend_schema(
        summary="Получение списка всех пользователей", 
        responses={
            status.HTTP_200_OK: UserSerializer, 
        }
    ), 
)
