docker cp ./nginx.conf.unfreeze spa-webserver-1:/etc/nginx/nginx.conf
docker-compose exec webserver nginx -s reload

