import React, { useEffect } from 'react';
import { Item, Header, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularAction } from '../redux/actions';
import { AppState, MovieStub } from '../redux/reducers';
import { Link } from 'react-router-dom';

export const MostPopular = () => {
  const dispatch = useDispatch();
  const popular = useSelector((state: AppState) => state.popular);

  useEffect(() => {
    dispatch(fetchPopularAction());
  }, [dispatch]);

  return (
    <>
      <Header>Most Popular</Header>
      <Loader active={popular.length === 0}>Loading</Loader>
      <Item.Group>
        {popular.map((movie: MovieStub) => {
          const imgPoster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w185${movie.poster_path}`
            : 'https://react.semantic-ui.com/images/wireframe/square-image.png';
          return (
            <Item key={movie.id} as={Link} to={`/movie/${movie.id}`}>
              <Item.Image size='tiny' src={imgPoster} />
              <Item.Content>
                <Item.Header>{movie.title}</Item.Header>
                <Item.Meta>Release Date: {movie.release_date}</Item.Meta>
                <Item.Description>{movie.overview}</Item.Description>
                <Item.Extra>Popularity Score: {movie.popularity}</Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </>
  );
};
