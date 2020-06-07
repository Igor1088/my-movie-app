import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchDiscover(
  mediaType,
  voteCount = 0,
  scoreMin = 0,
  scoreMax = 10,
  runtimeMin = 0,
  runtimeMax = 400,
  genres,
  sortBy = "popularity.desc",
  page = 1
) {
  genres = genres ? genres.join(",") : "";
  return (dispatch) => {
    dispatch(fetchDiscoverBegin());
    fetch(
      `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}&vote_count.gte=${voteCount}&vote_average.gte=${scoreMin}&vote_average.lte=${scoreMax}&with_genres=${genres}&with_runtime.gte=${runtimeMin}&with_runtime.lte=${runtimeMax}`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchDiscoverSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchDiscoverError(error));
      });
  };
}

const fetchDiscoverBegin = () => ({ type: types.FETCH_DISCOVER_BEGIN });

const fetchDiscoverSuccess = (data) => ({
  type: types.FETCH_DISCOVER_SUCCESS,
  payload: data,
});

const fetchDiscoverError = (error) => ({
  type: types.FETCH_DISCOVER_ERROR,
  payload: error,
});
