from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from django.contrib.auth import get_user_model


UserModel = get_user_model()


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['username', 'password', 'first_name', 'last_name', 'email', 'phone', 'telegram', 'organization', 'team']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data.pop('is_superuser', None)

        user = UserModel(**validated_data)
        user.set_password(validated_data['password'])
        user.save()

        return user

    def validate_password(self, value: str) -> str:
        validate_password(value)
        return value
