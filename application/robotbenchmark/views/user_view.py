from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from ..filters.user_filter import UserFilter
from ..permissions import UserPermission
from ..serializers.user_serializer import UserSerializer
from ..swagger_schemas.user_view_schema import user_view_schema


UserModel = get_user_model()


@user_view_schema
class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    filterset_class = UserFilter
    permission_classes = [UserPermission,]
    queryset = UserModel.objects.all().order_by('-date_joined')
