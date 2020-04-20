import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchTvShowDetails(id) {
  return (dispatch) => {
    dispatch(fetchTvShowDetailsBegin());
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=credits,images,similar,videos,reviews,external_ids`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchTvShowDetailsSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(fetchTvShowDetailsError(error));
      });
  };
}

const fetchTvShowDetailsBegin = () => ({ type: types.FETCH_SHOW_BEGIN });

const fetchTvShowDetailsSuccess = (tvShows) => ({
  type: types.FETCH_SHOW_SUCCESS,
  payload: tvShows,
});

const fetchTvShowDetailsError = (error) => ({
  type: types.FETCH_SHOW_ERROR,
  payload: error,
});
