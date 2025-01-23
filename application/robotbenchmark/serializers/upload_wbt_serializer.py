from drf_spectacular.types import OpenApiTypes
from drf_spectacular.utils import extend_schema_field
from rest_framework.serializers import Serializer, FileField, IntegerField

@extend_schema_field(OpenApiTypes.BINARY)  # Указываем, что FileField в OpenAPI - это binary
class BinaryFileField(FileField):
    pass


class WBTFileUploadRequestSerializer(Serializer):
    tournament_id = IntegerField(
        required=True,
        help_text="Идентификатор турнира, к которому относится файл."
    )
    file = BinaryFileField(
        required=True,
        help_text="Файл с расширением .wbt, который нужно загрузить."
    )
