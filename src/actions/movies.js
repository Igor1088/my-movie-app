import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchMovies(category, page, filter) {
  return dispatch => {
    dispatch(fetchMoviesBegin());
    if (category === "trending") {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/${filter}?api_key=${API_KEY}&language=en-US&page=${page}`
      )
        .then(handleErrors)
        .then(res => res.json())
        .then(data => {
          dispatch(fetchMoviesSuccess(data));
          return data;
        })
        .catch(error => {
          dispatch(fetchMoviesError(error));
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
      )
        .then(handleErrors)
        .then(res => res.json())
        .then(data => {
          dispatch(fetchMoviesSuccess(data));
          return data;
        })
        .catch(error => {
          dispatch(fetchMoviesError(error));
        });
    }
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
