import React, { useEffect } from 'react';
import {
  Image,
  Header,
  Grid,
  Segment,
  Container,
  List,
  StatisticGroup,
  Loader,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieAction } from '../redux/actions';
import { AppState } from '../redux/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { RouterProps } from 'react-router';
import { Helmet } from 'react-helmet';

const USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

type Props = {} & RouterProps & RouteComponentProps<{ id: string }>;

export const MoviePage = (props: Props) => {
  const dispatch = useDispatch();
  const movieId = Number.parseInt(props.match.params.id);
  const movie = useSelector((state: AppState) =>
    state.movies.find(movie => movie.id === movieId),
  );

  useEffect(() => {
    dispatch(fetchMovieAction({ id: movieId }));
  }, [dispatch, movieId]);

  if (!movie) {
    return (
      <Segment style={{ minHeight: '10rem' }}>
        <Loader active>Loading</Loader>
      </Segment>
    );
  }

  const statistics = [
    {
      key: 'budget',
      label: 'Budget',
      value: USD.format(movie?.budget),
    },
    {
      key: 'revenue',
      label: 'Revenue',
      value: USD.format(movie?.revenue),
    },
    {
      key: 'rating',
      label: 'Rating',
      value: `${movie?.vote_average}/10`,
    },
  ];

  const imgPoster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'https://react.semantic-ui.com/images/wireframe/square-image.png';

  return (
    <>
      <Helmet>
        <title>{`Movie App - ${movie.title}`}</title>
      </Helmet>
      <Segment style={{ marginLeft: '1rem', marginRight: '1rem' }}>
        <Container text>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={5}>
                <Image src={imgPoster} />
              </Grid.Column>
              <Grid.Column width={8}>
                <Header as='h1'>{movie?.title}</Header>
                <Header as='h5'>{movie?.tagline}</Header>
                <p>{movie?.overview}</p>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <StatisticGroup
                items={statistics}
                size='mini'
                floated='right'
                color='grey'
              />
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <List>
                  <Header>Cast</Header>
                  {movie?.cast.map(member => {
                    const imgMember = member.profile_path
                      ? `https://image.tmdb.org/t/p/w45${member.profile_path}`
                      : 'https://react.semantic-ui.com/images/wireframe/square-image.png';
                    return (
                      <List.Item key={member.id}>
                        <Image size='mini' src={imgMember} />
                        <List.Content>
                          <List.Header>{member.name}</List.Header>
                          <List.Description>
                            As: {member.character}
                          </List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <List>
                  <Header>Crew</Header>
                  {movie?.crew.map(member => {
                    const imgMember = member.profile_path
                      ? `https://image.tmdb.org/t/p/w45${member.profile_path}`
                      : 'https://react.semantic-ui.com/images/wireframe/square-image.png';
                    return (
                      <List.Item key={member.credit_id}>
                        <Image size='mini' src={imgMember} />
                        <List.Content>
                          <List.Header>{member.name}</List.Header>
                          <List.Description>{member.job}</List.Description>
                        </List.Content>
                      </List.Item>
                    );
                  })}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </>
  );
};
