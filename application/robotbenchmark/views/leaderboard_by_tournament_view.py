from django.contrib.auth import get_user_model
from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.tournament_serializer import TournamentSerializer
from ..models import Tournament
from ..serializers.leaderboard_serializer import LeaderboardSerializer, LeaderboardTournamentSerializer
from ..swagger_schemas.leaderboard_by_tournament_view_schema import leaderboard_by_tournament_view_schema


UserModel = get_user_model()


@leaderboard_by_tournament_view_schema
class LeaderboardByTournamentView(APIView):
    def get(self, request, tournament_id: int, format=None):
        tournament = Tournament.objects.get(pk=tournament_id)
        users = UserModel.objects.filter(user_tournaments__pk=tournament_id).annotate(total_points=Sum('tournamentuser__points')).order_by('-total_points')

        serializer = LeaderboardTournamentSerializer(data={
            'tournament': TournamentSerializer(tournament).data, 
            'items': LeaderboardSerializer(users, many=True).data, 
        })
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)
