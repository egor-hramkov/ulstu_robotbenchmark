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

Затем зайти в контейнер с django приложением и оттуда последовательно накатить миграции, создать юзера и выполнить сиды, чтобы в БД создались задачи
~~~
docker compose exec app sh
python3 manage.py migrate
python3 manage.py createsuperuser
python3 manage.py seed
~~~

После запуска перейти на 127.0.0.1:8047

Папка с проектами монтируется внутрь контейнера webots

Сейчас доступны контейнеры с webots, php, nginx, app, бд. Дефолтный порт сервера 8047

Почему-то иногда webots зависает и висит бесконечное "Starting simulation". Чтобы пофиксить надо убрать монтирование всех томов в webots, перезапустить контейнер, потом вернуть обратно. С чем это связано пока не разобрался.