/**
 * Simple set of sagas and api calls
 *
 */
import axios from 'axios';
import { all, call, put, spawn, takeEvery } from 'redux-saga/effects';
import {
  FetchMovieAction,
  FETCH_MOVIE_FAILED,
  FETCH_MOVIE_REQUESTED,
  FETCH_MOVIE_SUCCEEDED,
  FETCH_POPULAR_FAILED,
  FETCH_POPULAR_REQUESTED,
  FETCH_POPULAR_SUCCEEDED,
  SearchMovieAction,
  SEARCH_MOVIE_FAILED,
  SEARCH_MOVIE_REQUESTED,
  SEARCH_MOVIE_SUCCEEDED,
} from './actions';

// API calls to the node API Server

const doFetchMovie = async (id: number) => {
  let results = {};
  try {
    results = await axios.get(`http://localhost:4000/api/v1/movie?id=${id}`);
  } catch (e) {
    console.error(e);
    results = { hasError: true };
  }
  return results;
};

const doFetchPopular = async () => {
  let results = {};
  try {
    results = await axios.get(`http://localhost:4000/api/v1/popular`);
  } catch (e) {
    console.error(e);
    results = { hasError: true };
  }
  return results;
};

const doSearchMovie = async (query: string) => {
  let results = {};
  try {
    results = await axios.get(
      `http://localhost:4000/api/v1/search?query=${query}`,
    );
  } catch (e) {
    console.error(e);
    results = { hasError: true };
  }
  return results;
};

//Sagas that call the above api calls

function* fetchMovieSaga(action: FetchMovieAction) {
  try {
    const result = yield call(doFetchMovie, action.payload.id);
    console.log(result);
    yield put({ type: FETCH_MOVIE_SUCCEEDED, payload: result });
  } catch (error) {
    yield put({ type: FETCH_MOVIE_FAILED, message: error.message });
  }
}

function* fetchPopularMoviesSaga() {
  try {
    const result = yield call(doFetchPopular);
    console.log(result);
    yield put({ type: FETCH_POPULAR_SUCCEEDED, payload: result });
  } catch (error) {
    yield put({ type: FETCH_POPULAR_FAILED, message: error.message });
  }
}

function* searchMoviesSaga(action: SearchMovieAction) {
  if (action.payload.query === undefined) {
    // bail if we don't have a query
    return;
  }
  try {
    const result = yield call(doSearchMovie, action.payload.query);
    console.log(result);
    yield put({ type: SEARCH_MOVIE_SUCCEEDED, payload: result });
  } catch (error) {
    yield put({ type: SEARCH_MOVIE_FAILED, message: error.message });
  }
}

export function* watchMovies() {
  yield takeEvery(FETCH_MOVIE_REQUESTED, fetchMovieSaga);
  yield takeEvery(FETCH_POPULAR_REQUESTED, fetchPopularMoviesSaga);
  yield takeEvery(SEARCH_MOVIE_REQUESTED, searchMoviesSaga);
}

export function* moviesSaga() {
  yield all([watchMovies()]);
}

export default function* root() {
  yield spawn(moviesSaga);
}
