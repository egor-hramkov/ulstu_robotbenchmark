from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from ..filters.problem_filter import ProblemFilter
from ..models import Problem
from ..permissions import IsAdminOrOperator
from ..serializers.problem_serializer import ProblemSerializer
from ..swagger_schemas.problem_view_schema import problem_view_schema


@problem_view_schema
class ProblemViewSet(viewsets.ModelViewSet):
    serializer_class = ProblemSerializer
    filterset_class = ProblemFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    queryset = Problem.objects.all()

    def get_permissions(self):
        if self.request.method in ['GET']:
            # Для GET-запросов требуется аутентификация пользователя
            permission_classes = [IsAuthenticated]
        else:
            # Для POST-, PUT- и DELETE-запросов требуется быть суперпользователем
            permission_classes = [IsAdminOrOperator]
        return [permission() for permission in permission_classes]
