from django.contrib.auth import get_user_model, login
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from ..permissions import UserPermission
from ..serializers.user_serializer import UserSerializer, LoginSerializer

UserModel = get_user_model()


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = UserModel.objects.all().order_by("-date_joined")
    permission_classes = [UserPermission, ]


class LoginView(APIView):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)
