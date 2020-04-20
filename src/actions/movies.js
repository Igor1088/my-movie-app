import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchMovies(category, page, filter) {
  return (dispatch) => {
    dispatch(fetchMoviesBegin());
    if (category === "trending") {
      fetch(
        `https://api.themoviedb.org/3/trending/movie/${filter}?api_key=${API_KEY}&page=${page}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchMoviesSuccess(data));
          return data;
        })
        .catch((error) => {
          dispatch(fetchMoviesError(error));
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&page=${page}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchMoviesSuccess(data));
          return data;
        })
        .catch((error) => {
          dispatch(fetchMoviesError(error));
        });
    }
  };
}

const fetchMoviesBegin = () => ({ type: types.FETCH_MOVIES_BEGIN });

const fetchMoviesSuccess = (movies) => ({
  type: types.FETCH_MOVIES_SUCCESS,
  payload: movies,
});

const fetchMoviesError = (error) => ({
  type: types.FETCH_MOVIES_ERROR,
  payload: error,
});
