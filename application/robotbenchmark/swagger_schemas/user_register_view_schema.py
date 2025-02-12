from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from ..serializers.user_register_serializer import UserRegisterSerializer


user_register_view_schema = extend_schema_view(
    create=extend_schema(
        summary="Регистрация нового пользователя", 
        responses={
            status.HTTP_200_OK: UserRegisterSerializer, 
        }
    ), 
)
