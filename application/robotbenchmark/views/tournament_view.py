from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from ..models import Tournament, TaskStatus
from ..permissions import IsAdminOrOperator
from ..serializers.tournament_serializer import TournamentSerializer
from ..swagger_schemas.tournament_view_schema import tournament_view_schema


@tournament_view_schema
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
        problems = tournament.tournament_entries.filter(status=TaskStatus.COMPLETED)
        for problem in problems:
            problem.status = TaskStatus.QUARANTINE
            problem.save()

        return Response({"message": "Tournament and related problems have been blocked"}, status=status.HTTP_200_OK)
