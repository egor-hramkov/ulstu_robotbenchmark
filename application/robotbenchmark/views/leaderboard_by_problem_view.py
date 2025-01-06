from django.contrib.auth import get_user_model
from django.db.models import F
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.problem_serializer import ProblemWithImageURLSerializer
from ..models import Problem
from ..serializers.leaderboard_serializer import LeaderboardProblemSerializer, LeaderboardSerializer
from ..swagger_schemas.leaderboard_by_problem_view_schema import leaderboard_by_problem_view_schema


UserModel = get_user_model()


@leaderboard_by_problem_view_schema
class LeaderboardByProblemView(APIView):
    def get(self, request, problem_id: int, format=None):
        problem = Problem.objects.get(pk=problem_id)
        users = UserModel.objects.filter(user_problems__pk=problem_id).annotate(total_points=F('problemuser__points')).order_by('-total_points')

        serializer = LeaderboardProblemSerializer(data={
            'problem': ProblemWithImageURLSerializer(problem).data, 
            'items': LeaderboardSerializer(users, many=True).data, 
        })
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data)
