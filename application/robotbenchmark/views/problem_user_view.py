from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from robotbenchmark.models import ProblemUser
from robotbenchmark.serializers.problem_user_serializer import ProblemUserSerializer


@extend_schema(tags=["users-problem"])
@extend_schema_view(
    retrieve=extend_schema(
        summary="Детальная информация о соревнованиях пользователя",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    list=extend_schema(
        summary="Детальная информация о всех соревнованиях пользователей",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    update=extend_schema(
        summary="Обновление данных о соревновании пользователя",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    create=extend_schema(
        summary="Создание соревнования пользователю",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    destroy=extend_schema(
        summary="Удаление соревнования пользователю",
        responses={
            status.HTTP_200_OK: ProblemUserSerializer
        }
    ),
    partial_update=extend_schema(
        summary="Обновление с необ. полями соревнования пользователю",
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

    # def get_object(self, user_id: int, problem_id: int) -> ProblemUser:
    #     instance = ProblemUser.objects.get(user_id=user_id, problem_id=problem_id)
    #     return instance

    # def retrieve(self, request, *args, **kwargs):
    #     user: User = request.user
    #     problem_id = kwargs['pk']
    #     instance = self.get_object(user.id, problem_id)
    #     serializer = self.get_serializer(instance)
    #     return Response(
    #         {'problem': serializer.data}
    #     )
