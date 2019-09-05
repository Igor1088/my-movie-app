import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchMovieDetails(id) {
  return dispatch => {
    dispatch(fetchMovieDetailsBegin());
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,images,reviews,similar`
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchMovieDetailsSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchMovieDetailsError(error));
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
}

function fetchMovieDetailsBegin() {
  return {
    type: types.FETCH_MOVIE_BEGIN
  };
}

function fetchMovieDetailsSuccess(movies) {
  return {
    type: types.FETCH_MOVIE_SUCCESS,
    payload: movies
  };
}

function fetchMovieDetailsError(error) {
  return {
    type: types.FETCH_MOVIE_ERROR,
    payload: error
  };
}
