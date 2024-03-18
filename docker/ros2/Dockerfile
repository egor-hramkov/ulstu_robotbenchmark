FROM niurover/webots_ros2_foxy

#ARG BASE_IMAGE_WEBOTS=cyberbotics/webots:R2023b-ubuntu22.04
#ARG ROS_IMAGE=osrf/ros:humble-desktop
#
#FROM $BASE_IMAGE_WEBOTS AS base
#FROM $ROS_IMAGE AS image2

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update --allow-insecure-repositories
RUN apt install -y python3-pip subversion nano
RUN pip3 install tornado pynvml psutil requests distro asyncprocess
ENV DISPLAY=:99
COPY ./docker/webots/new_webots/config /usr/local/webots/resources/web/server/config
#COPY server/key /usr/local/webots/resources/web/server/key
COPY ./docker/webots/new_webots/simulation_server.py /usr/local/webots/resources/web/server/simulation_server.py
COPY ./docker/webots/new_webots/server.sh /usr/local/server.sh
RUN chmod 654 /usr/local/server.sh
USER root
#CMD ["/usr/local/server.sh", ""]
