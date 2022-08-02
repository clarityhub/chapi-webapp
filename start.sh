#!/bin/bash

docker build ./fixtures/docker/local -t clarityhub-webapp

if [[ $* == *-n* ]]; then
    docker run \
        --rm \
        --publish 3000:3000 \
        --network=clarityhub-network \
        --mount src="$(pwd)",target=/webapp,type=bind \
        --network-alias clarityhub-webapp \
        --name clarityhub-webapp \
        clarityhub-webapp

else
    docker run \
        -it \
        --rm \
        --publish 3000:3000 \
        --network=clarityhub-network \
        --mount src="$(pwd)",target=/webapp,type=bind \
        --network-alias clarityhub-webapp \
        --name clarityhub-webapp \
        clarityhub-webapp
fi
