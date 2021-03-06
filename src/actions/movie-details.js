import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchMovieDetails(id) {
  return (dispatch) => {
    dispatch(fetchMovieDetailsBegin());
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos,images,reviews,similar`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchMovieDetailsSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(fetchMovieDetailsError(error));
      });
  };
}

const fetchMovieDetailsBegin = () => ({ type: types.FETCH_MOVIE_BEGIN });

const fetchMovieDetailsSuccess = (movies) => ({
  type: types.FETCH_MOVIE_SUCCESS,
  payload: movies,
});

const fetchMovieDetailsError = (error) => ({
  type: types.FETCH_MOVIE_ERROR,
  payload: error,
});
