# Гайд как настроить службу consumer_service.py в линуксовую

1. Файлы системных служб для systemd располагаются либо в /etc/systemd/system/, либо в пользовательской директории
обслуживания. Для глобальной службы создайте новый файл руками:
~~~
sudo nano /etc/systemd/system/consumer_service.service
~~~

2. Содержимое файла:
~~~
[Unit]
Description=Consumer Service
After=network.target

[Service]
ExecStart=/usr/bin/python3 /путь/к/скрипту/consumer_service.py
WorkingDirectory=/путь/к/скрипту
Restart=always
User=имя_пользователя
Group=группа_пользователя

[Install]
WantedBy=multi-user.target
~~~

3. Установите нужные разрешения
~~~
chmod +x /путь/к/скрипту/consumer_service.py
~~~

4. Перезагрузите systemd и включите службу:
~~~
sudo systemctl daemon-reload
~~~
5. Включите службу, чтобы она автоматически запускалась при перезагрузке системы:
~~~
sudo systemctl enable consumer_service.service
~~~
6. Запустите и проверьте службу
~~~
sudo systemctl start consumer_service.service
sudo systemctl status consumer_service.service
~~~
Если всё прошло успешно, вы увидите, что служба запущена, и ваш скрипт работает.

7. Логирование службы
~~~
sudo journalctl -u consumer_service.service

or

sudo journalctl -u consumer_service.service -f
~~~
8. Управление службой
Теперь вы можете управлять своим Python-скриптом так же, как и любой другой службой:
~~~
Остановить: sudo systemctl stop consumer_service.service
Перезапустить: sudo systemctl restart consumer_service.service
Запустить заново вручную: sudo systemctl start consumer_service.service
~~~
