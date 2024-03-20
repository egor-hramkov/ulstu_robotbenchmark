# FROM niurover/webots_ros2_foxy

#ARG BASE_IMAGE_WEBOTS=cyberbotics/webots:R2023b-ubuntu22.04
#ARG ROS_IMAGE=osrf/ros:humble-desktop
#
#FROM $BASE_IMAGE_WEBOTS AS base
FROM osrf/ros:iron-desktop


ENV DEBIAN_FRONTEND=noninteractive

RUN apt update --allow-insecure-repositories
RUN apt install -y python3-pip subversion nano
RUN pip3 install tornado pynvml psutil requests distro asyncprocess
RUN apt-get update && apt-get install -y \
    wget \
    software-properties-common \
    libxtst6

RUN wget -qO- https://cyberbotics.com/Cyberbotics.asc | sudo apt-key add -
RUN add-apt-repository 'deb https://cyberbotics.com/debian/ binary-amd64/'

RUN apt-get update && apt-get install -y webots


ENV DISPLAY=:99
COPY ./docker/webots/new_webots/config /usr/local/webots/resources/web/server/config
# COPY server/key /usr/local/webots/resources/web/server/key
COPY ./docker/webots/new_webots/simulation_server.py /usr/local/webots/resources/web/server/simulation_server.py
COPY ./docker/webots/new_webots/server.sh /usr/local/server.sh
# ToDO ПОПЫТАТЬСЯ ИСХОДНИК ТЕСЛЫ ЗАКИНУТЬ И ЗАПУСТИТЬ
# RUN chmod 654 /usr/local/server.sh
USER root
# RUN . /opt/ros/foxy/setup.sh


# mkdir -p ~/ros2_ws/src
# cd ~/ros2_ws/src
# git clone --recurse-submodules https://github.com/cyberbotics/webots_ros2.git
# git clone --recurse-submodules https://github.com/cyberbotics/webots_ros2.git src/webots_ros2
# git clone --recurse-submodules -b develop https://github.com/cyberbotics/webots_ros2.git src/webots_ros2
# Check dependencies
# из ros2_ws!
# rosdep update
# rosdep install --from-paths src --ignore-src --rosdistro foxy

# Building packages
# colcon build

# apt-get install python-dev

# colcon build
