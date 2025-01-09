from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from robotbenchmark.serializers.tournament_user_serializer import TournamentUserSerializer
from robotbenchmark.models import TournamentUser
from ..swagger_schemas.tournament_user_view_schema import tournament_user_view_schema


@tournament_user_view_schema
class TournamentUserViewSet(viewsets.ModelViewSet):
    serializer_class = TournamentUserSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    queryset = TournamentUser.objects.all()
