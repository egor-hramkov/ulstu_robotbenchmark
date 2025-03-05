import random
import logging
import json
from datetime import datetime
from django.contrib.sessions.models import Session

import jwt
from django.conf import settings
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated

from ..permissions import IsAdminOrOwner
from rest_framework.response import Response
from rest_framework.views import APIView
from robotbenchmark.models import ProblemUser, CustomUser, CommandQueue, TaskStatus
from robotbenchmark.serializers.problem_user_serializer import ProblemUserSerializer
from ..swagger_schemas.problem_user_view_schema import problem_user_view_schema, check_access_schema

@problem_user_view_schema
class ProblemUserViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemUserSerializer
    permission_classes = [IsAdminOrOwner]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    queryset = ProblemUser.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        robot_panel_port = random.randint(10000, 12000)
        vs_port = random.randint(10000, 12000)
        webots_stream_port = random.randint(10000, 12000)

        p = ProblemUser.objects.create(
            user=serializer.validated_data['user'],
            problem=serializer.validated_data['problem'],
            tournament=serializer.validated_data['tournament'],
            points=serializer.validated_data.get('points', 0),
            launch_command=serializer.validated_data.get('launch_command', ''),
            status=serializer.validated_data.get('status', TaskStatus.CREATED),
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
        queryset = self.filter_queryset(self.get_queryset())

        # Если пользователь не является администратор, фильтруем только его данные
        if not request.user.is_staff:
            queryset = queryset.filter(user=request.user)

        problem_id = request.query_params.get('problem_id')
        tournament_id = request.query_params.get('tournament_id')
        user_id = request.query_params.get('user_id')
        is_checked = request.query_params.get('is_checked')

        if problem_id:
            queryset = queryset.filter(problem=problem_id)
        if tournament_id:
            queryset = queryset.filter(tournament=tournament_id)
        if is_checked:
            queryset = queryset.filter(status=TaskStatus.CHECKED)

        # Фильтрация по пользователю работает только для администратора
        if user_id and request.user.is_staff:
            queryset = queryset.filter(user=user_id)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserProblemLauncher(APIView):
    """Вью для запуска решения предоставленной командой пользователя"""

    def get(self, request, problem_user_id: int, format=None):
        """Запуск решения командой пользователя (передача в контейнер команды)"""
        pu = ProblemUser.objects.get(id=problem_user_id)
        user_command = pu.launch_command
        container_name = pu.user.username + str(pu.id)

        now = datetime.now()
        formatted_time = now.strftime('%Y-%m-%d_%H-%M')

        command_for_start_record = f"ros2 service call /Ros2Supervisor/animation_start_recording webots_ros2_msgs/srv/SetString \"{{value: '/ulstu/records/{formatted_time}/webots_animation.html'}}\""
        command_to_container = f'echo "source /ulstu/ros2_ws/install/setup.bash" >> ~/.bashrc; cd ~/ros2_ws; colcon build; source /ulstu/.bashrc; mkdir /ulstu/records; mkdir /ulstu/records/{formatted_time}; {user_command} > /dev/null 2>&1 & {command_for_start_record}'
        command = f"""docker exec -d ulstu-{container_name} bash -i -c '{command_to_container}'"""
        CommandQueue.objects.create(
            command=command
        )
        return Response(status=200)


class CheckProblemUserAccess(APIView):
    #permission_classes = [IsAuthenticated]

    @check_access_schema
    def get(self, request, format=None):
        logger = logging.getLogger(__name__)

        try:
            token = request.COOKIES.get('sessionid')
            print(f'token: {token}')
            if token and len(token) > 40:
                decoded_token = jwt.decode(token, settings.SIMPLE_JWT['SIGNING_KEY'], algorithms=[settings.SIMPLE_JWT['ALGORITHM']])
                print('decoded token: {decoded_token}')
                user_id = decoded_token.get('user_id')
                is_superuser = decoded_token.get('is_superuser', False)
            else:
                # session = Session.objects.get(session_key=token)
                # session_data = session.get_decoded()
                # print(f'session data: {session_data}')
                # user_id = session_data.get('user_id')
                user_id = request.COOKIES.get('userid')
                print(f'user_id: {user_id}')
                user = CustomUser.objects.get(id=user_id)
                #is_superuser = False
                is_superuser = user.is_superuser
            print(f'user_id: {user_id} is_superuser: {is_superuser}')

            if is_superuser:
                return Response({"detail": "Access granted for superuser"}, status=200)
            nginx_port = request.META.get('HTTP_X_SERVER_PORT', None)

            if not nginx_port:
                return Response({"detail": "Port missing in request"}, status=400)

            try:
                pu = ProblemUser.objects.get(
                    Q(user_id=user_id) & (
                            Q(robot_panel_port=nginx_port) |
                            Q(vs_port=nginx_port) |
                            Q(webots_stream_port=nginx_port)
                    )
                )
                print(f'pu status: {pu.tournament.is_blocked}')
                if pu.tournament.is_blocked:
                    return Response({"detail": "TASK IS FREEZE"}, status=403)
                return Response({"detail": "Access granted"}, status=200)
            except ProblemUser.DoesNotExist:
                return Response({"detail": "Forbidden: Invalid port"}, status=403)

        except jwt.ExpiredSignatureError:
            return Response({"detail": "Token has expired"}, status=401)
        except jwt.InvalidTokenError:
            print('invalid token')
            return Response({"detail": "Invalid token"}, status=401)
