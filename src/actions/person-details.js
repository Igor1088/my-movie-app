import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchPersonDetails(id) {
  return dispatch => {
    dispatch(fetchPersonDetailsBegin());
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=movie_credits,tv_credits,images,external_ids,combined_credits`
    )
      .then(handleErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(fetchPersonDetailsSuccess(data));
        return data;
      })
      .catch(error => {
        dispatch(fetchPersonDetailsError(error));
      });
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
}

const fetchPersonDetailsBegin = () => ({ type: types.FETCH_PERSON_BEGIN });

const fetchPersonDetailsSuccess = movies => ({
  type: types.FETCH_PERSON_SUCCESS,
  payload: movies
});

const fetchPersonDetailsError = error => ({
  type: types.FETCH_PERSON_ERROR,
  payload: error
});
