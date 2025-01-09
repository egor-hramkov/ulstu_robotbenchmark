from django.contrib.auth import login
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers.login_serializer import LoginSerializer
from ..swagger_schemas.login_view_schema import login_view_schema


@login_view_schema
class LoginView(APIView):
    serializer_class = LoginSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        login(request, user)

        return Response(None, status=status.HTTP_202_ACCEPTED)
