# ulstu_robotbenchmark

Развернуть и запустить проект
~~~
cd application
cp .env.example .env
cd ../docker
cp .env.example .env
docker compose build
docker compose up -d
~~~
После запуска перейти на 127.0.0.1:8047

Папка с проектами монтируется внутрь контейнера webots

Сейчас доступны контейнеры с webots, php, nginx, app, бд. Дефолтный порт сервера 8047

trello: https://trello.com/b/pBtdevcB/webots