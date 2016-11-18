#/bin/bash

APP_ENV=$1

if [[ -z "$1" ]]; then
  echo "No environment passed as first arg (dev, staging, prod)";
  exit 1
fi

sudo docker stop $(sudo docker ps -a -q)
sudo docker rm $(sudo docker ps -a -q)

sudo docker images -q | sudo xargs docker rmi -f

sudo docker pull quay.io/ziplinelabs/gecko-web:${APP_ENV}-latest

sudo docker run -d -p 80:8180 quay.io/ziplinelabs/gecko-web:${APP_ENV}-latest
