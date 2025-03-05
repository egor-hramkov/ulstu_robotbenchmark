#!/bin/bash

# Список имен контейнеров, в которые нужно скопировать файлы
CONTAINER_NAMES=(
#    "ulstu-godor133328"
    "ulstu-Khayrullin_Imil22"
#    "ulstu-robolife_afk20"
#    "ulstu-carbonaros27"
#    "ulstu-ssskiv26"
#    "ulstu-raa25"
#    "ulstu-TimurIdiatullov24"
#    "ulstu-hibers23"
#    "ulstu-robolife_way21"
)

# Пути к файлам, которые нужно скопировать
FILE1="robocross_gazelle_test.wbt"
FILE2="GazelleNext.proto"

# Пути назначения в контейнерах
DEST1="/ulstu/ros2_ws/src/webots_ros2_suv/worlds/robocross_gazelle.wbt"
DEST2="/ulstu/ros2_ws/src/webots_ros2_suv/protos/GazelleNext.proto"

# Проверка наличия файлов перед копированием
if [[ ! -f "$FILE1" ]] || [[ ! -f "$FILE2" ]]; then
    echo "❌ ОШИБКА: Один или оба файла отсутствуют в текущей папке!"
    exit 1
fi

# Копирование файлов в указанные контейнеры по имени
for NAME in "${CONTAINER_NAMES[@]}"; do
    CONTAINER_ID=$(docker ps --format "{{.ID}} {{.Names}}" | grep -w "$NAME" | awk '{print $1}')

    if [[ -z "$CONTAINER_ID" ]]; then
        echo "⚠️ Контейнер с именем $NAME не найден или не запущен, пропускаем..."
        continue
    fi

    echo "🚀 Копируем файлы в контейнер $NAME ($CONTAINER_ID)..."

    docker cp "$FILE1" "$CONTAINER_ID:$DEST1"
    if [[ $? -eq 0 ]]; then
        echo "✅ $FILE1 скопирован в $DEST1 контейнера $NAME"
    else
        echo "❌ Ошибка копирования $FILE1 в контейнер $NAME"
    fi

    docker cp "$FILE2" "$CONTAINER_ID:$DEST2"
    if [[ $? -eq 0 ]]; then
        echo "✅ $FILE2 скопирован в $DEST2 контейнера $NAME"
    else
        echo "❌ Ошибка копирования $FILE2 в контейнер $NAME"
    fi
done

echo "✅ Все операции завершены!"

