import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchSearchResults(query, page) {
  return (dispatch) => {
    page = page ? page : 1;
    dispatch(fetchSearchBegin());
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=false`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchSearchSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(fetchSearchError(error));
      });
  };
}

const fetchSearchBegin = () => {
  return {
    type: types.FETCH_SEARCH_BEGIN,
  };
};

const fetchSearchSuccess = (query) => {
  return {
    type: types.FETCH_SEARCH_SUCCESS,
    payload: query,
  };
};

const fetchSearchError = (error) => {
  return {
    type: types.FETCH_SEARCH_ERROR,
    payload: error,
  };
};
