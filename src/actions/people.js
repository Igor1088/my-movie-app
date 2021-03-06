import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchPeople(page, category, filter) {
  return (dispatch) => {
    dispatch(fetchPeopleBegin());
    if (category === "trending") {
      fetch(
        `https://api.themoviedb.org/3/trending/person/${filter}?api_key=${API_KEY}&language=en&page=${page}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchPeopleSuccess(data));
          return data;
        })
        .catch((error) => {
          dispatch(fetchPeopleError(error));
        });
    } else {
      fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&language=en&page=${page}`
      )
        .then(handleErrors)
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchPeopleSuccess(data));
          return data;
        })
        .catch((error) => {
          dispatch(fetchPeopleError(error));
        });
    }
  };
}

const fetchPeopleBegin = () => ({ type: types.FETCH_PEOPLE_BEGIN });

const fetchPeopleSuccess = (people) => ({
  type: types.FETCH_PEOPLE_SUCCESS,
  payload: people,
});

const fetchPeopleError = (error) => ({
  type: types.FETCH_PEOPLE_ERROR,
  payload: error,
});
