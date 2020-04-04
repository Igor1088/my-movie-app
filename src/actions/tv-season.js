import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchSeasonDetails(id, number) {
  return dispatch => {
    dispatch(fetchSeasonBegin());
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&language=en-US`
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(fetchSeasonSuccess(data));
        return data;
      })
      .catch(error => {
        dispatch(fetchSeasonError(error));
      });
  };
}

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
};

const fetchSeasonBegin = () => {
  return {
    type: types.FETCH_SEASON_BEGIN
  };
};

const fetchSeasonSuccess = season => {
  return {
    type: types.FETCH_SEASON_SUCCESS,
    payload: season
  };
};

const fetchSeasonError = error => {
  return {
    type: types.FETCH_SEASON_ERROR,
    payload: error
  };
};
