#!/bin/sh 
Xvfb :99 -screen 0 1024x768x16 & 
python3 webots/resources/web/server/simulation_server.py config/simulation/local.json & 
python3 webots/resources/web/server/session_server.py config/session/local.json
