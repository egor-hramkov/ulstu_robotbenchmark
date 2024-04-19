import json
import os
import time
import urllib.request as req

print("Служба запущена!")
while True:
    url = 'http://localhost:8000/api/commands/'
    response = req.urlopen(url)
    data = response.read()
    data_dict = json.loads(data)
    if data_dict:
        os.system(data_dict['command'])

    time.sleep(5)
