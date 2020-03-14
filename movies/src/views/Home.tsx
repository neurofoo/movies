import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { fetchPopularAction } from '../redux/actions';
import { MostPopular } from './MostPopular';
import { SearchContainer } from './SearchContainer';

export const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPopularAction());
  }, [dispatch]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
          <SearchContainer />
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={3}></Grid.Column>
        <Grid.Column width={10}>
          <MostPopular />
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
