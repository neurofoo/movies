import React, { useState } from 'react';
import { Search, SearchProps, List } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieAction } from '../redux/actions';
import { AppState } from '../redux/reducers';
import { debounce } from 'lodash';
import { Redirect, Link } from 'react-router-dom';

const resultRenderer = result => {
  return (
    <List.Item as={Link} to=''>
      <List.Content>
        <List.Header>{result.title}</List.Header>
      </List.Content>
    </List.Item>
  );
};

export const SearchContainer = () => {
  const [selected, setSelected] = useState(0);
  const dispatch = useDispatch();
  const results = useSelector((state: AppState) => state.search);

  const isLoading = false;

  const handleSearchChange = debounce((data: SearchProps) => {
    const { value } = data;
    dispatch(searchMovieAction({ query: value }));
  }, 200);

  const handleResultSelect = (_, data: any) => {
    setSelected(data.result.key);
  };

  const formattedResults =
    results?.results?.map(result => ({
      title: result.title,
      key: result.id,
    })) || [];

  if (selected !== 0) {
    return <Redirect to={`/movie/${selected}`} />;
  }

  return (
    <Search
      fluid
      size='large'
      loading={isLoading}
      onResultSelect={handleResultSelect}
      onSearchChange={(_, data) => handleSearchChange(data)}
      resultRenderer={resultRenderer}
      results={formattedResults}
    />
  );
};
