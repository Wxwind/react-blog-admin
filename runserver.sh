#!/bin/bash
## author:wxwind

imageName=reactblogadmin
containerName=reactblogadminInstance

echo "stop running cantainer and delete image.."
docker stop $containerName &&
    docker rm $containerName &&
    docker rmi $imageName

echo "delete dangling images"
docker rmi "$(docker images -f "dangling=true" -q)"

echo "build image..."
docker build -t $imageName . &&
    docker run -p 8000:80 -d -p 8001:443 --name $containerName \
        -v /soft/react_website/react_website/deploy/nginx/nginx.conf:/etc/nginx/nginx.conf \
        -v /soft/react_website/react_website/deploy/nginx/cert:/etc/nginx/cert \
        -v /soft/react_website/react_website/deploy/nginx/sites:/etc/nginx/sites \
        -v /etc/letsencrypt:/etc/letsencrypt \
        -v /var/lib/letsencrypt:/var/lib/letsencrypt $imageName
