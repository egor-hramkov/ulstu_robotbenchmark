from drf_spectacular.utils import extend_schema
from ..serializers.problem_user_serializer import ProblemUserSerializer


get_problem_user_view_schema = extend_schema(
    description="Детальная информация о задаче на турнире конкретного пользователя", 
    responses=ProblemUserSerializer(), 
)
