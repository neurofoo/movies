FROM node

# copy and install the front end client code and build it
WORKDIR /usr/src/movies
COPY ./movies .
RUN npm install
RUN npm run build

# copy and install the api server code and build it
WORKDIR /usr/src/movies-api
COPY ./movies-api .
RUN npm install
RUN npm run build

# install serve to be able to serve the client app
WORKDIR /usr/src 
RUN npm install -g serve 

# capy the bash main file
WORKDIR /usr/src
COPY ./run.sh .


EXPOSE 8080
EXPOSE 4000

CMD ["bash","/usr/src/run.sh"]
