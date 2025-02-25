from rest_framework import serializers
from robotbenchmark.models import Tournament
from robotbenchmark.models import TournamentUser
from django.contrib.auth import get_user_model
from robotbenchmark.serializers.user_serializer import UserSerializer


UserModel = get_user_model()


class TournamentSerializer(serializers.ModelSerializer):
    """Сериализатор для модели Соревнование"""

    # Отвечает за отображение полной информации о пользователях
    users = UserSerializer(many=True, read_only=True)

    # Позволяет клиенту передать список идентификаторов пользователей 
    # для создания или обновления записи соревнования по логике ниже
    users_ids = serializers.ListField(child=serializers.IntegerField(), write_only=True, required=False)

    def create(self, validated_data):
        users_ids = validated_data.pop('users_ids', [])
        problems_data = validated_data.pop('problems', [])

        tournament = Tournament.objects.create(**validated_data)
        tournament.problems.set(problems_data)

        tournament_users = []

        for id in users_ids:
            try:
                user = UserModel.objects.get(id=id)
                tournament_users.append(user)

                TournamentUser.objects.create(
                    user=user, 
                    tournament=tournament, 
                    is_completed=False, 
                    points=0, 
                )
            except UserModel.DoesNotExist:
                print(f"User with identifier {id} does not exist!")

        tournament.users.set(tournament_users)
        return tournament

    def update(self, instance, validated_data):
        users_ids = validated_data.pop('users_ids', [])
        problems_data = validated_data.pop('problems', [])

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if problems_data:
            instance.problems.set(problems_data)

        if users_ids:
            instance.users.clear()

            tournament_users = []

            for id in users_ids:
                try:
                    user = UserModel.objects.get(id=id)
                    tournament_users.append(user)

                    TournamentUser.objects.create(
                        user=user, 
                        tournament=instance, 
                    )
                except UserModel.DoesNotExist:
                    print(f"User with identifier {id} does not exist!")

        instance.users.set(tournament_users)
        return instance

    class Meta:
        model = Tournament
        fields = '__all__'
