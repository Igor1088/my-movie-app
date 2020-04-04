import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchPeople(page, trending, filter) {
  return dispatch => {
    dispatch(fetchPeopleBegin());
    if (trending) {
      fetch(
        `https://api.themoviedb.org/3/trending/person/${filter}?api_key=${API_KEY}&language=en&page=${page}`
      )
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
          dispatch(fetchPeopleSuccess(res));
          return res;
        })
        .catch(error => {
          dispatch(fetchPeopleError(error));
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en&page=${page}`
      )
        .then(handleErrors)
        .then(res => res.json())
        .then(res => {
          dispatch(fetchPeopleSuccess(res));
          return res;
        })
        .catch(error => {
          dispatch(fetchPeopleError(error));
        });
    }
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusMessage);
  }
  return response;
}

function fetchPeopleBegin() {
  return {
    type: types.FETCH_PEOPLE_BEGIN
  };
}

function fetchPeopleSuccess(people) {
  return {
    type: types.FETCH_PEOPLE_SUCCESS,
    payload: people
  };
}

function fetchPeopleError(error) {
  return {
    type: types.FETCH_PEOPLE_ERROR,
    payload: error
  };
}