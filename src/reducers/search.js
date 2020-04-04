import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  results: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SEARCH_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        results: action.payload
      };
    case types > types.FETCH_SEARCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export const getSearchResults = state => state.search.results;
export const getSearchResultsLoading = state => state.search.loading;
export const getSearchResultsError = state => state.search.error;
