# ulstu_robotbenchmark

Развернуть webots_ros2 согласно docker/webots/Readme

Развернуть и запустить проект
~~~
cd application
cp .env.example .env
cd ../docker
cp .env.example .env
docker compose build
docker compose up -d
~~~

В контейнере app автоматически накатываются миграции и создаётся админ с логином: admin и паролем: admin

После запуска перейти на 127.0.0.1:8047

Папка с проектами монтируется внутрь контейнера webots

Сейчас доступны контейнеры с webots, php, nginx, app, бд. Дефолтный порт сервера 8047

Почему-то иногда webots зависает и висит бесконечное "Starting simulation". Чтобы пофиксить надо убрать монтирование всех томов в webots, перезапустить контейнер, потом вернуть обратно. С чем это связано пока не разобрался.