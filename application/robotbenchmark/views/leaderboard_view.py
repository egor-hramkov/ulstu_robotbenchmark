from django.contrib.auth import get_user_model
from django.db.models import Sum
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.leaderboard_serializer import LeaderboardSerializer
from ..swagger_schemas.leaderboard_view_schema import leaderboard_view_schema


UserModel = get_user_model()


@leaderboard_view_schema
class LeaderboardView(APIView):
    def get(self, request, format=None):
        users = UserModel.objects.all().annotate(total_points=Sum('tournamentuser__points')).order_by('-total_points')
        serializer = LeaderboardSerializer(users, many=True)
        return Response(serializer.data)
