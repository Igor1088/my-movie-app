import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchTvShowDetails(id) {
  return dispatch => {
    dispatch(fetchTvShowDetailsBegin());
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,images,similar,videos`
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchTvShowDetailsSuccess(res));
        return res;
      })
      .catch(error => {
        dispatch(fetchTvShowDetailsError(error));
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
}

function fetchTvShowDetailsBegin() {
  return {
    type: types.FETCH_SHOW_BEGIN
  };
}

function fetchTvShowDetailsSuccess(tvShows) {
  return {
    type: types.FETCH_SHOW_SUCCESS,
    payload: tvShows
  };
}

function fetchTvShowDetailsError(error) {
  return {
    type: types.FETCH_SHOW_ERROR,
    payload: error
  };
}
