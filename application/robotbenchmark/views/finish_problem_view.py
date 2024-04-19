from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from robotbenchmark.models import ProblemUser

from robotbenchmark.models import CommandQueue


class FinishProblemView(APIView):
    """Вью завершения задачи"""

    permission_classes = [IsAuthenticated]

    def get(self, problemuser_id: int):
        """Удаляет докер контейнер и файлы в ОС пользователя по айди записи в таблице ProblemUser"""
        problemuser_id = self.request.query_params['problemuser_id']
        p = ProblemUser.objects.get(pk=problemuser_id)
        if p.user.id == self.request.user.id:
            return Response({"detail": "Недостаточно прав!"}, status=status.HTTP_403_FORBIDEN)

        docker_container_name = 'ulstu-' + p.user.username + str(p.id)
        command_remove_container = f"docker rm -f {docker_container_name}"
        CommandQueue.objects.create(
            command=command_remove_container
        )

        dir_prefix = '../projects/'  # для удаления исходников пользователя
        command_remove_folder = f"rm -rf {dir_prefix}{docker_container_name}"
        CommandQueue.objects.create(
            command=command_remove_folder
        )
        return Response()
