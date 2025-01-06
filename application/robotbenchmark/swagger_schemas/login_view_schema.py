from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from ..serializers.login_serializer import LoginSerializer


login_view_schema = extend_schema_view(
    post=extend_schema(
        summary="Авторизация пользователя", 
        responses={
            status.HTTP_200_OK: LoginSerializer, 
        }
    ), 
)
