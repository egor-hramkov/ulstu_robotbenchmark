import json
import os
import time
import urllib.request as req
from urllib.error import URLError
import logging

logging.basicConfig(
    level=logging.INFO,  # Уровень логирования (INFO, DEBUG, WARNING, ERROR, CRITICAL)
    format="%(levelname)s - %(message)s",  # Формат сообщения лога
    handlers=[
        logging.StreamHandler()  # Обеспечивает вывод в консоль
    ]
)

logger = logging.getLogger(__name__)


def make_wbt_file_update(data_dict: dict):
    parts = [part.strip() for part in data_dict['command'].split(';')]
    dirs_part = parts[0].split('DIRS - ')[1].strip()
    dirs = [d.strip() for d in dirs_part.split(',')]
    tournament_id = int(parts[1].split('tournament_id - ')[1].strip())
    filename = parts[2].split('filename - ')[1].strip()

    url = f'http://localhost:8000/media/webots_files/{tournament_id}/{filename}'
    response = req.urlopen(url)

    for user_dir in dirs:
        save_directory = f"../../projects/{user_dir}/webots_ros2_suv/worlds"
        for filename in os.listdir(save_directory):
            if filename.endswith('.wbt'):
                file_to_remove = os.path.join(save_directory, filename)
                os.remove(file_to_remove)
                with open(file_to_remove, 'wb') as output_file:
                    output_file.write(response.read())


def make_sync():
    """Делает синхронизацию записей с контейнеров на хост-машину"""
    all_projects = "../../projects/"
    host_media_path = "../../../application/media/records"
    if not os.path.exists(host_media_path):
        os.makedirs(host_media_path)

    if not os.path.exists(all_projects):
        os.makedirs(all_projects)

    for dir_name in os.listdir(all_projects):
        dir_path = os.path.join(all_projects, dir_name)

        if os.path.isdir(dir_path):
            container_name = f"ulstu-{dir_name}"
            target_path = os.path.join(host_media_path, dir_name)

            if not os.path.exists(target_path):
                os.makedirs(target_path)

            command = f"docker cp {container_name}:/ulstu/records {target_path}"
            logger.info(command)
            os.system(command)


print("Служба запущена!")
os.chdir("../docker/webots/robocross.virtual-main")
while True:
    try:
        url = 'http://localhost:8000/api/commands/'
        response = req.urlopen(url)
    except URLError:
        logger.info('Сервер недоступен!')
    else:
        data = response.read()
        data_dict = json.loads(data)

        if data_dict:
            if data_dict['command_type'] == 'os_command':
                logger.info(data_dict['command'])
                os.system(data_dict['command'])
            elif data_dict['command_type'] == 'custom':
                logger.info(data_dict['command'])
                make_wbt_file_update(data_dict)

            elif data_dict['command_type'] == 'sync':
                logger.info("ПРИЛЕТЕЛ СИНК")
                make_sync()
    finally:
        time.sleep(5)
