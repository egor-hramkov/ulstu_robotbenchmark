docker cp ./nginx.conf.freeze spa-webserver-1:/etc/nginx/nginx.conf
docker-compose exec webserver nginx -s reload

