#!/bin/bash

function cleanup {
  bun teardown
}

trap cleanup EXIT

if ! command -v bun &> /dev/null
then
    echo "bun could not be found"
    exit 1
fi

bun install

bun setup

until [ "docker inspect -f {{.State.Health.Status}} postgres"=="healthy" ]; do
    sleep 5;
done;

bun start
