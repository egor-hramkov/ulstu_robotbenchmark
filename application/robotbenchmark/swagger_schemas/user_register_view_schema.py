from drf_spectacular.utils import extend_schema, OpenApiResponse
from rest_framework import status, serializers
from ..serializers.user_register_serializer import UserRegisterSerializer


class UserRegisterResponseSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    message = serializers.CharField()


user_register_view_schema = extend_schema(
    summary="Регистрация нового пользователя", 
    request=UserRegisterSerializer, 
    responses={
        status.HTTP_201_CREATED: OpenApiResponse(
            response=UserRegisterResponseSerializer, 
            description="Успешная регистрация пользователя", 
        ), 
        status.HTTP_400_BAD_REQUEST: OpenApiResponse(
            response=UserRegisterSerializer, 
            description="Ошибка валидации", 
        ), 
    }
)
