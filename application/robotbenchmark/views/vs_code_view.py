from rest_framework.response import Response
from rest_framework.views import APIView

from robotbenchmark.models import ProblemUser

from robotbenchmark.models import CommandQueue
from robotbenchmark.swagger_schemas.vs_code_view_schema import vs_code_view_schema


class VsCodeView(APIView):

    @vs_code_view_schema
    def get(self, request, problem_user_id, *args, **kwargs):
        pu = ProblemUser.objects.get(id=problem_user_id)

        # ToDo Hramkov: Сделать метод get_container_name в классе ProblemUser
        docker_container_name = 'ulstu-' + pu.user.username + str(pu.id)

        command_for_restart_container = f'docker restart {docker_container_name}'
        command_for_start_vs_code = f"docker exec -d -i {docker_container_name} bash -c 'pgrep code-server || code-server --bind-addr 0.0.0.0:31415 --auth none --disable-telemetry --log debug --proxy-domain virtual.robocross.ru' ; "
        command = f"{command_for_restart_container} && {command_for_start_vs_code}"

        CommandQueue.objects.create(command=command)

        return Response(status=200)



