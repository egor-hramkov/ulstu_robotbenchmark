from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from ..serializers.user_register_serializer import UserRegisterSerializer
from ..swagger_schemas.user_register_view_schema import user_register_view_schema


UserModel = get_user_model()


@user_register_view_schema
class UserRegisterViewSet(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            return Response({'user_id': user.id, 'message': 'User successfully registered!'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
