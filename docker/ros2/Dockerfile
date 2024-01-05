ARG BASE_IMAGE_WEBOTS=cyberbotics/webots:R2023b-ubuntu22.04
ARG ROS_IMAGE=osrf/ros:humble-desktop

FROM $BASE_IMAGE_WEBOTS AS base
FROM $ROS_IMAGE AS image2

#FROM osrf/ros:humble-desktop

#RUN apt-get update && apt-get install wget
#
#
#RUN mkdir -p /etc/apt/keyrings &&  \
#    cd /etc/apt/keyrings && \
#    wget -q https://cyberbotics.com/Cyberbotics.asc
#
#RUN echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/Cyberbotics.asc] https://cyberbotics.com/debian binary-amd64/" | tee /etc/apt/sources.list.d/Cyberbotics.list && \
#    apt update
#
#RUN apt install webots
