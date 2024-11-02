from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Tournament
from ..permissions import IsAdminOrOperator
from ..serializers.tournament_serializer import TournamentSerializer


@extend_schema(tags=["tournament"])
@extend_schema_view(
    retrieve=extend_schema(
        summary="Детальная информация о соревновании",
        responses={
            status.HTTP_200_OK: TournamentSerializer
        }
    ),
    list=extend_schema(
        summary="Получение списка соревнований",
        responses={
            status.HTTP_200_OK: TournamentSerializer
        }
    ),
    update=extend_schema(
        summary="Обновление данных о соревновании",
        responses={
            status.HTTP_200_OK: TournamentSerializer
        }
    ),
    create=extend_schema(
        summary="Создание соревнования",
        responses={
            status.HTTP_200_OK: TournamentSerializer
        }
    ),
    destroy=extend_schema(
        summary="Удаление соревнования",
        responses={
            status.HTTP_200_OK: TournamentSerializer
        }
    ),
    partial_update=extend_schema(
        summary="Обновление с необязательными полями соревнования",
        responses={
            status.HTTP_200_OK: TournamentSerializer
        }
    )
)
class TournamentViewSet(viewsets.ModelViewSet):
    """ViewSet Соревнования"""
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    def get_permissions(self):
        if self.request.method in ['GET']:
            # Для запросов GET требуется аутентификация пользователя
            permission_classes = [IsAuthenticated]
        else:
            # Для запросов POST, PUT и DELETE требуется быть суперпользователем
            permission_classes = [IsAdminOrOperator]
        return [permission() for permission in permission_classes]


class BlockTournamentAPIView(APIView):
    permission_classes = [IsAdminOrOperator]

    def post(self, request, tournament_id):
        try:
            tournament = Tournament.objects.get(id=tournament_id)
        except Tournament.DoesNotExist:
            return Response({"error": "Tournament not found"}, status=status.HTTP_404_NOT_FOUND)

        # Обновление статуса блокировки турнира
        tournament.is_blocked = True
        tournament.save()

        # Блокируем все связанные задачи
        problems = tournament.problems.all()
        for problem in problems:
            problem.is_blocked = True
            problem.save()

        return Response({"message": "Tournament and related problems have been blocked"}, status=status.HTTP_200_OK)
