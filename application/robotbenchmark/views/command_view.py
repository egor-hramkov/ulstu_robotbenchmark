from rest_framework.response import Response
from rest_framework.views import APIView
from robotbenchmark.models import CommandQueue
from robotbenchmark.serializers.command_serializer import CommandQueueSerializer
from robotbenchmark.models import CommandType


class CommandQueueView(APIView):
    def get(self, request, format=None):
        command = CommandQueue.objects.first()

        if not command:
            CommandQueue.objects.create(command_type=CommandType.SYNC, command="")
            return Response([], status=200)

        serializer = CommandQueueSerializer(command)
        command.delete()

        return Response(serializer.data)
