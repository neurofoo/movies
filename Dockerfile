FROM node

# copy and install the front end client code and build it
WORKDIR /usr/src/movies
COPY ./movies .
RUN npm install
RUN npm run build

WORKDIR /usr/src/movies-api
COPY ./movies-api .
RUN npm install
# TODO: include a build here to be safe

WORKDIR /usr/src 
RUN npm install -g serve 


WORKDIR /usr/src
COPY ./run.sh .


# now need to server the client code as well as the server code

EXPOSE 8080
EXPOSE 4000

CMD ["bash","/usr/src/run.sh"]
