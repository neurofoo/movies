# Frederick Movie App

## To Clone, Build, and Run

Create and go to your desired directory and git clone this project into it as normal.

```
git clone https://github.com/neurofoo/movies
```

Then, build and run the docker image as follows: 
```
docker build . -t frederick-movies
```

Then, to run the image use the following:

```
docker run -p 8080:8080 -p 4000:4000 -d frederick-movies 
```

NB: make sure to use the exact ports as above. The react client app is not doing dynamic port discovery and is expecting to send api calls to localhost:4000.



If all goes well, you should be able to build the docker image and run it. Then open Chrome and go to http://localhost:8080 
