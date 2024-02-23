from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response

from robotbenchmark.models import ProblemUser
from robotbenchmark.serializers.problem_user_serializer import ProblemUserSerializer


class ProblemUserViewSet(viewsets.ModelViewSet):
    queryset = ProblemUser.objects.all()
    serializer_class = ProblemUserSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]

    # def get_object(self, user_id: int, problem_id: int) -> ProblemUser:
    #     instance = ProblemUser.objects.get(user_id=user_id, problem_id=problem_id)
    #     return instance

    # def retrieve(self, request, *args, **kwargs):
    #     user: User = request.user
    #     problem_id = kwargs['pk']
    #     instance = self.get_object(user.id, problem_id)
    #     serializer = self.get_serializer(instance)
    #     return Response(
    #         {'problem': serializer.data}
    #     )
