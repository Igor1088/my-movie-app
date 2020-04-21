import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchSeasonDetails(id, number) {
  return (dispatch) => {
    dispatch(fetchSeasonBegin());
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${number}?api_key=${API_KEY}&append_to_response=credits,videos`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchSeasonSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(fetchSeasonError(error));
      });
  };
}

const fetchSeasonBegin = () => {
  return {
    type: types.FETCH_SEASON_BEGIN,
  };
};

const fetchSeasonSuccess = (season) => {
  return {
    type: types.FETCH_SEASON_SUCCESS,
    payload: season,
  };
};

const fetchSeasonError = (error) => {
  return {
    type: types.FETCH_SEASON_ERROR,
    payload: error,
  };
};
