from drf_spectacular.utils import extend_schema, OpenApiParameter

vs_code_view_schema = extend_schema(
    summary="Перезапустить контейнер и запустить VS Code",
    description=(
        "Принимает идентификатор задачи-пользователя в виде `problem_user_id`, затем формирует команду для перезапуска контейнера и запуска VS Code."
    ),
    parameters=[
        OpenApiParameter(
            name="problem_user_id",
            description="ID пользователя из таблицы `ProblemUser`, по которому выполняются действия.",
            required=True,
            type=int,
            location=OpenApiParameter.PATH,
        ),
    ],
    responses={200: None, 404: {"description": "Запись не найдена"}},
)
