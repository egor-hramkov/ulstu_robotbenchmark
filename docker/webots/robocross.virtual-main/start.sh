make all FLAVOR="devel" ROBOT_PANEL_PORT=10004 VS_PORT=10005 WEBOTS_STREAM_PORT=10006
docker exec -it ulstu-devel sudo sed -i 's/\r$//g' /ulstu/.bashrc

