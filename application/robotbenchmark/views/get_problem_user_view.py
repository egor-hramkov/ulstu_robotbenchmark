from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from robotbenchmark.models import ProblemUser
from robotbenchmark.serializers.problem_user_serializer import ProblemUserSerializer
from ..permissions import IsAdminOrOperator
from ..swagger_schemas.get_problem_user_view_schema import get_problem_user_view_schema


@get_problem_user_view_schema
class GetProblemUserView(APIView):
    permission_classes = [IsAdminOrOperator]

    def get(self, request, problem_id: int, tournament_id: int, user_id: int):
        try:
            problem_user = ProblemUser.objects.get(
                user=user_id, 
                problem=problem_id, 
                tournament=tournament_id, 
            )

            serializer = ProblemUserSerializer(problem_user)

            return Response(serializer.data)
        except ProblemUser.DoesNotExist:
            raise NotFound('No record with the specified identifiers were found!')
