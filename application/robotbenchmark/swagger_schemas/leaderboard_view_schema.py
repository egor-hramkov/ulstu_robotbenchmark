from drf_spectacular.utils import extend_schema
from ..serializers.leaderboard_serializer import LeaderboardSerializer


leaderboard_view_schema = extend_schema(
    description="Общая таблица лидеров", 
    responses=LeaderboardSerializer(many=True), 
)
