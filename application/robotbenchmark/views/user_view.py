from django.contrib.auth import get_user_model, login
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from ..permissions import UserPermission
from ..serializers.user_serializer import UserSerializer, LoginSerializer

UserModel = get_user_model()


@extend_schema(tags=["users"])
@extend_schema_view(
    retrieve=extend_schema(
        summary="Детальная информация пользователе",
        responses={
            status.HTTP_200_OK: UserSerializer
        }
    ),
    list=extend_schema(
        summary="Получение списка пользователей",
        responses={
            status.HTTP_200_OK: UserSerializer
        }
    ),
    update=extend_schema(
        summary="Обновление данных о пользователе",
        responses={
            status.HTTP_200_OK: UserSerializer
        }
    ),
    create=extend_schema(
        summary="Создание пользователя",
        responses={
            status.HTTP_200_OK: UserSerializer
        }
    ),
    destroy=extend_schema(
        summary="Удаление пользователя",
        responses={
            status.HTTP_200_OK: UserSerializer
        }
    ),
    partial_update=extend_schema(
        summary="Обновление с необязательными полями пользователей",
        responses={
            status.HTTP_200_OK: UserSerializer
        }
    )
)
class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all().order_by("-date_joined")
    permission_classes = [UserPermission, ]


class LoginView(APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
