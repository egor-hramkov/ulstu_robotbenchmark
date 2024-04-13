from django.contrib.auth import get_user_model
from django.db.models import Sum, F
from rest_framework.response import Response
from rest_framework.views import APIView

from serializers.leaderboard_serializer import LeaderboardSerializer


class LeaderboardByProblemView(APIView):
    """Вью для лидерборда определённой задачи"""

    def get(self, request, problem_id: int, format=None):
        """Return Leaderboard определённой задачи"""
        user_model = get_user_model()
        users = user_model.objects.filter(user_problems__pk=problem_id).annotate(total_points=F('problemuser__points'))
        serializer = LeaderboardSerializer(users, many=True)
        return Response(serializer.data)



