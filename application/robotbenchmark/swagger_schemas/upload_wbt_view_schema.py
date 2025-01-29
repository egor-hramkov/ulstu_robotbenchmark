from drf_spectacular.utils import extend_schema, extend_schema_view

from robotbenchmark.serializers.upload_wbt_serializer import WBTFileUploadRequestSerializer

upload_wbt_schema = extend_schema_view(
    post=extend_schema(
        summary="Загрузка WBT файла",
        description="Этот эндпоинт позволяет загружать файлы с расширением .wbt и принимает tournament_id.",
        request=WBTFileUploadRequestSerializer,
        responses={
            200: {"description": "Файл успешно загружен!"},
            400: {"description": "Ошибка при загрузке файла."}
        },
    )
)
