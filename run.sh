#!/bin/sh

serve -s /usr/src/movies/build -l 8080 &
node /usr/src/movies-api/dist/index.js 
