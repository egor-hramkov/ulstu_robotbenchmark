from drf_spectacular.utils import extend_schema
from ..serializers.leaderboard_serializer import LeaderboardProblemSerializer


leaderboard_by_problem_view_schema = extend_schema(
    description="Таблица лидеров определённой задачи", 
    responses=LeaderboardProblemSerializer(), 
)
