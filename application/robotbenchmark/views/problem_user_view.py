import random

from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from robotbenchmark.models import ProblemUser, CommandQueue
from robotbenchmark.serializers.problem_user_serializer import ProblemUserSerializer


@extend_schema(tags=["users-problem"])
@extend_schema_view(
    retrieve=extend_schema(
        summary="Детальная информация о задачах пользователя",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    list=extend_schema(
        summary="Детальная информация о всех задачах пользователей",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    update=extend_schema(
        summary="Обновление данных о задачах пользователя",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    create=extend_schema(
        summary="Создание задачах пользователю",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    destroy=extend_schema(
        summary="Удаление задачах пользователю",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    partial_update=extend_schema(
        summary="Обновление с необ. полями задачах пользователю",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    )
)
class ProblemUserViewSet(viewsets.ModelViewSet):
    queryset = ProblemUser.objects.all()
    serializer_class = ProblemUserSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        robot_panel_port = random.randint(10000, 12000)
        vs_port = random.randint(10000, 12000)
        webots_stream_port = random.randint(10000, 12000)

        p = ProblemUser.objects.create(
            user=self.request.user,
            problem=serializer.validated_data['problem'],
            points=serializer.validated_data['points'],
            is_completed=serializer.validated_data['is_completed'],
            robot_panel_port=robot_panel_port,
            vs_port=vs_port,
            webots_stream_port=webots_stream_port
        )
        command = f"make all FLAVOR={p.user.username + str(p.id)} ROBOT_PANEL_PORT={robot_panel_port} VS_PORT={vs_port} WEBOTS_STREAM_PORT={webots_stream_port}"

        CommandQueue.objects.create(
            command=command
        )

        serializer = self.get_serializer(p)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
