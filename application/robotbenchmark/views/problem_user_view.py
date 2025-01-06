import random
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from robotbenchmark.models import ProblemUser, CommandQueue, TaskStatus
from robotbenchmark.serializers.problem_user_serializer import ProblemUserSerializer
from ..swagger_schemas.problem_user_view_schema import problem_user_view_schema


@problem_user_view_schema
class ProblemUserViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemUserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    queryset = ProblemUser.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        robot_panel_port = random.randint(10000, 12000)
        vs_port = random.randint(10000, 12000)
        webots_stream_port = random.randint(10000, 12000)

        p = ProblemUser.objects.create(
            user=self.request.user,
            problem=serializer.validated_data['problem'],
            tournament=serializer.validated_data['tournament'],
            points=serializer.validated_data['points'],
            launch_command=serializer.validated_data['launch_command'],
            status=serializer.validated_data['status'],
            robot_panel_port=robot_panel_port,
            vs_port=vs_port,
            webots_stream_port=webots_stream_port
        )
        command = (f"make all FLAVOR={p.user.username + str(p.id)} ROBOT_PANEL_PORT={robot_panel_port} "
                   f"VS_PORT={vs_port} WEBOTS_STREAM_PORT={webots_stream_port} ROS2_PROJECT={p.problem.world_path}")

        CommandQueue.objects.create(
            command=command
        )

        serializer = self.get_serializer(p)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request, *args, **kwargs):
        """Получение списка задач турнира по айди турнира и пользователя"""
        user_id = request.query_params.get('user_id')
        tournament_id = request.query_params.get('tournament_id')
        is_checked = request.query_params.get('is_checked')
        qs = self.filter_queryset(self.get_queryset())
        condition = Q()

        if tournament_id:
            condition &= Q(problem__tournaments__id=tournament_id)
        if user_id:
            condition &= Q(user__id=user_id)
        if is_checked:
            condition &= Q(status=TaskStatus.CHECKED)

        problem_users = qs.filter(condition)
        serializer = self.get_serializer(problem_users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProblemLauncher(APIView):
    """Вью для запуска решения предоставленной командой пользователя"""

    def get(self, request, problem_user_id: int, format=None):
        """Запуск решения командой пользователя (передача в контейнер команды)"""
        pu = ProblemUser.objects.get(id=problem_user_id)
        user_command = pu.launch_command
        container_name = pu.user.username + str(pu.id)
        command = f"docker exec -it ulstu-{container_name} /bin/bash -c '{user_command}'"
        print(command)
        CommandQueue.objects.create(
            command=command
        )
        return Response(status=200)
