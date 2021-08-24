#!/bin/bash


for id in $(seq 1 2);do
   ./node_modules/.bin/pm2 start bin/run.js --name="server_${id}"  --watch -- "$@"
done
