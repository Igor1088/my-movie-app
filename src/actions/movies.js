import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchMovies(category, page) {
  return dispatch => {
    dispatch(fetchMoviesBegin());
    fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchMoviesSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchMoviesError(error));
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
}

function fetchMoviesBegin() {
  return {
    type: types.FETCH_MOVIES_BEGIN
  };
}

function fetchMoviesSuccess(movies) {
  return {
    type: types.FETCH_MOVIES_SUCCESS,
    payload: movies
  };
}

function fetchMoviesError(error) {
  return {
    type: types.FETCH_MOVIES_ERROR,
    payload: error
  };
}
