/**
 * Create const strings to avoid typo errors
 * Create needed redux action creators
 *
 */

export const FETCH_POPULAR_REQUESTED = 'FETCH_POPULAR_REQUESTED';
export const FETCH_POPULAR_SUCCEEDED = 'FETCH_POPULAR_SUCCEEDED';
export const FETCH_POPULAR_FAILED = 'FETCH_POPULAR_FAILED';

export const FETCH_MOVIE_REQUESTED = 'FETCH_MOVIE_REQUESTED';
export const FETCH_MOVIE_SUCCEEDED = 'FETCH_MOVIE_SUCCEEDED';
export const FETCH_MOVIE_FAILED = 'FETCH_MOVIE_FAILED';

export const SEARCH_MOVIE_REQUESTED = 'SEARCH_MOVIE_REQUESTED';
export const SEARCH_MOVIE_SUCCEEDED = 'SEARCH_MOVIE_SUCCEEDED';
export const SEARCH_MOVIE_FAILED = 'SEARCH_MOVIE_FAILED';

export type FetchPopularAction = {
  type: typeof FETCH_POPULAR_REQUESTED;
  payload: {};
};
export const fetchPopularAction = (): FetchPopularAction => ({
  type: FETCH_POPULAR_REQUESTED,
  payload: {},
});

export type FetchMovieAction = {
  type: typeof FETCH_MOVIE_REQUESTED;
  payload: { id: number };
};
export const fetchMovieAction = ({ id }: { id: number }): FetchMovieAction => ({
  type: FETCH_MOVIE_REQUESTED,
  payload: { id },
});

export type SearchMovieAction = {
  type: typeof SEARCH_MOVIE_REQUESTED;
  payload: { query: string | undefined };
};
export const searchMovieAction = ({
  query,
}: {
  query: string | undefined;
}): SearchMovieAction => ({
  type: SEARCH_MOVIE_REQUESTED,
  payload: { query },
});
