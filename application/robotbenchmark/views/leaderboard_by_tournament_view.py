from django.contrib.auth import get_user_model
from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.views import APIView

from serializers.leaderboard_serializer import LeaderboardSerializer


class LeaderboardByTournamentView(APIView):
    """Вью для лидерборда определённого турнира"""

    def get(self, request, tournament_id: int, format=None):
        """Return Leaderboard определённого турнира"""
        user_model = get_user_model()
        users = user_model.objects.filter(user_tournaments__pk=tournament_id).annotate(total_points=Sum('tournamentuser__points'))
        serializer = LeaderboardSerializer(users, many=True)
        return Response(serializer.data)



