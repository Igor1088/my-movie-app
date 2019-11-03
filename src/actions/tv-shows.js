import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchTvShows(category, page) {
  return dispatch => {
    dispatch(fetchTvShowsBegin());
    fetch(
      `https://api.themoviedb.org/3/tv/${category}?api_key=${API_KEY}&language=en-US&page=${page}`
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchTvShowsSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchTvShowsError(error));
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
}

const fetchTvShowsBegin = () => {
  return {
    type: types.FETCH_SHOWS_BEGIN
  };
};

const fetchTvShowsSuccess = tvShows => {
  return {
    type: types.FETCH_SHOWS_SUCCESS,
    payload: tvShows
  };
};

function fetchTvShowsError(error) {
  return {
    type: types.FETCH_SHOWS_ERROR,
    payload: error
  };
}
