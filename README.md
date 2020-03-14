# Frederick Movie App

## To Run

Create and go to your desired directory and git clone this project into it.

```
git clone https://github.com/neurofoo/movies
```

Then, build and run the docker image as follow substituting the first port values (8080, 4000) for ones of your choice if those ports are in use.

```
docker build . -t frederick-movies
docker run -p 8080:8080 -p 4000:4000 -d frederick-movies 
```

If all goes well, you should be able to build the docker image and run it. Then open Chrome and go to http://localhost:8080 (or whatever port number you used).
