import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchTvShows(category, page, filter) {
  return (dispatch) => {
    dispatch(fetchTvShowsBegin());
    if (category === "trending") {
      fetch(
        `https://api.themoviedb.org/3/trending/tv/${filter}?api_key=${API_KEY}&page=${page}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchTvShowsSuccess(data, category));
          return data;
        })
        .catch((error) => {
          dispatch(fetchTvShowsError(error));
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/tv/${category}?api_key=${API_KEY}&page=${page}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchTvShowsSuccess(data, category));
          return data;
        })
        .catch((error) => {
          dispatch(fetchTvShowsError(error));
        });
    }
  };
}

const fetchTvShowsBegin = () => ({ type: types.FETCH_SHOWS_BEGIN });

const fetchTvShowsSuccess = (tvShows, category) => ({
  type: types.FETCH_SHOWS_SUCCESS,
  payload: tvShows,
  category: category,
});

const fetchTvShowsError = (error) => ({
  type: types.FETCH_SHOWS_ERROR,
  payload: error,
});
