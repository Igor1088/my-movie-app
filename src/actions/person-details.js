import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchPersonDetails(id) {
  return dispatch => {
    dispatch(fetchPersonDetailsBegin());
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US&append_to_response=tv_credits,images,external_ids,combined_credits`
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(res => {
        dispatch(fetchPersonDetailsSuccess(res));
        return res;
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

function fetchPersonDetailsBegin() {
  return {
    type: types.FETCH_PERSON_BEGIN
  };
}

function fetchPersonDetailsSuccess(movies) {
  return {
    type: types.FETCH_PERSON_SUCCESS,
    payload: movies
  };
}

function fetchPersonDetailsError(error) {
  return {
    type: types.FETCH_PERSON_ERROR,
    payload: error
  };
}
