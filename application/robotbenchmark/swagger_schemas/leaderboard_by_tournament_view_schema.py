from drf_spectacular.utils import extend_schema
from ..serializers.leaderboard_serializer import LeaderboardTournamentSerializer


leaderboard_by_tournament_view_schema = extend_schema(
    description="Таблица лидеров определённого турнира", 
    responses=LeaderboardTournamentSerializer(), 
)
