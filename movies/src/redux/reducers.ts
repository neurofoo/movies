/**
 * Simple single root reducer
 *
 * TS Types
 * - have not normalized the movie types for this version
 *
 */
import { isUndefined, unionWith } from 'lodash';
import { Action, Reducer } from 'redux';
import {
  FETCH_MOVIE_SUCCEEDED,
  FETCH_POPULAR_SUCCEEDED,
  SEARCH_MOVIE_SUCCEEDED,
} from './actions';

export type MovieStub = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type Cast = {
  cast_id: number; //ID unique within a film
  character: string;
  credit_id: string;
  gender: number;
  id: number; //unique to the actor
  name: string;
  order: number; //order of appearance/credits in film
  profile_path: string;
};

export type Crew = {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string;
  name: string;
  origin_county: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  iso_639_1: string;
  name: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: boolean;
  budget: number;
  cast: Cast[];
  crew: Crew[];
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchResult = {};

export type AppState = {
  movies: Movie[];
  popular: MovieStub[];
  search: {
    page: number;
    total_results: number;
    total_pages: number;
    results: MovieStub[];
  };
};

export const defaultStore = {
  movies: [],
  popular: [],
  search: {
    page: 0,
    total_results: 0,
    total_pages: 0,
    results: [],
  },
};

export const rootReducer: Reducer<AppState, Action> = (
  state: AppState | undefined,
  action: any,
): AppState => {
  if (isUndefined(state)) return defaultStore;

  switch (action.type) {
    case FETCH_POPULAR_SUCCEEDED:
      return {
        ...state,
        popular: action?.payload.data.results || [],
      };

    case FETCH_MOVIE_SUCCEEDED:
      return {
        ...state,
        movies: unionWith(
          state.movies,
          [action.payload.data],
          (server, local) => server.id === local.id,
        ),
      };

    case SEARCH_MOVIE_SUCCEEDED:
      return {
        ...state,
        search: action.payload.data,
      };

    default:
      return state;
  }
};
