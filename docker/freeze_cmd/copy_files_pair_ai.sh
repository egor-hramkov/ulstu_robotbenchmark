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

# Пары "файл -> целевой путь" для копирования
FILES_AND_DESTINATIONS=(
    "robocross_gazelle_final_barrel_ai.wbt:/ulstu/ros2_ws/src/webots_ros2_suv/worlds/robocross_gazelle.wbt"
    "GazelleNext.proto:/ulstu/ros2_ws/src/webots_ros2_suv/protos/GazelleNext.proto"
    "PlasticBarrel.proto:/ulstu/ros2_ws/src/webots_ros2_suv/protos/PlasticBarrel.proto"
    "materials.txt:/ulstu/ros2_ws/src/webots_ros2_suv/protos/materials.txt"
)

# Проверка наличия файлов перед копированием
for FILE_PAIR in "${FILES_AND_DESTINATIONS[@]}"; do
    FILE_PATH=$(echo "$FILE_PAIR" | cut -d':' -f1)
    if [[ ! -f "$FILE_PATH" ]]; then
        echo "❌ ОШИБКА: Файл $FILE_PATH отсутствует в текущей папке!"
        exit 1
    fi
done

# Копирование файлов в указанные контейнеры по имени
for NAME in "${CONTAINER_NAMES[@]}"; do
    CONTAINER_ID=$(docker ps --format "{{.ID}} {{.Names}}" | grep -w "$NAME" | awk '{print $1}')

    if [[ -z "$CONTAINER_ID" ]]; then
        echo "⚠️ Контейнер с именем $NAME не найден или не запущен, пропускаем..."
        continue
    fi

    echo "🚀 Копируем файлы в контейнер $NAME ($CONTAINER_ID)..."

    for FILE_PAIR in "${FILES_AND_DESTINATIONS[@]}"; do
        FILE_PATH=$(echo "$FILE_PAIR" | cut -d':' -f1)
        DEST_PATH=$(echo "$FILE_PAIR" | cut -d':' -f2)

        docker cp "$FILE_PATH" "$CONTAINER_ID:$DEST_PATH"
        if [[ $? -eq 0 ]]; then
            echo "✅ $FILE_PATH скопирован в $DEST_PATH контейнера $NAME"
        else
            echo "❌ Ошибка копирования $FILE_PATH в контейнер $NAME"
        fi
    done

done

echo "✅ Все операции завершены!"

