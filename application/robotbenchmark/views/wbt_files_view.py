import os

from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.views import APIView

from ..models import ProblemUser, CommandQueue, CommandType
from ..serializers.upload_wbt_serializer import WBTFileUploadRequestSerializer


@method_decorator(csrf_exempt, name='dispatch')
class UploadWBTFileView(APIView):

    @extend_schema(
        request=WBTFileUploadRequestSerializer,
        responses={status.HTTP_200_OK: "File uploaded successfully."},
    )
    def post(self, request, *args, **kwargs):
        """Замена wbt файла у определённого турнира"""
        serializer = WBTFileUploadRequestSerializer(data=request.data)
        if serializer.is_valid():
            tournament_id = serializer.validated_data['tournament_id']
            file = serializer.validated_data['file']
            if not file.name.endswith('.wbt'):
                return JsonResponse({'error': 'Неправильный формат файла.'}, status=400)
        else:
            return JsonResponse({'error': 'Неправильные параметры запроса'}, status=400)

        problems_to_update = ProblemUser.objects.filter(tournament_id=tournament_id)
        command = 'DIRS - '
        command += ', '.join([problem.user.username + str(problem.id) for problem in
                              problems_to_update])  # Формируем названия папок через запятую, в которых необходимо заменить файл.

        tournament_folder = os.path.join(settings.MEDIA_ROOT, 'webots_files', str(tournament_id))
        os.makedirs(tournament_folder, exist_ok=True)  # Создаём папку, если она ещё не существует

        # Сохранение файла
        fs = FileSystemStorage(location=tournament_folder)  # Указываем директорию для сохранения
        filename = fs.save(file.name, file)  # Файл сохраняется под своим оригинальным именем
        file_url = os.path.join(settings.MEDIA_URL, 'webots_files', str(tournament_id), filename)

        command += f' ; tournament_id - {tournament_id}; filename - {filename} '  # + Айди турнира + Название файла
        CommandQueue.objects.create(command_type=CommandType.CUSTOM, command=command)

        return JsonResponse({
            'message': 'Файл успешно загружен.',
            'file_name': filename,
            'file_url': file_url,
        }, status=200)
