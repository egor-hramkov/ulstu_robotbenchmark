ARG BASE_IMAGE_WEBOTS=cyberbotics/webots:R2023b-ubuntu22.04
ARG ROS_IMAGE=osrf/ros:humble-desktop

FROM $BASE_IMAGE_WEBOTS AS base
FROM $ROS_IMAGE AS image2

RUN apt update --allow-insecure-repositories
RUN apt install -y firejail python3-pip subversion nano
RUN pip3 install tornado pynvml psutil requests distro
ENV DISPLAY=:99
COPY ./docker/webots/server/config /usr/local/webots/resources/web/server/config
#COPY server/key /usr/local/webots/resources/web/server/key
COPY ./docker/webots/simulation_server.py /usr/local/webots/resources/web/server/simulation_server.py
COPY ./docker/webots/server.sh /usr/local/server.sh
RUN chmod 654 /usr/local/server.sh
USER root
#CMD ["/usr/local/server.sh", ""]
