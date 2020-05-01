import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  movies: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_MOVIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: {
          ...state["movies"],
          [action.category]: {
            ...action.payload,
          },
        },
      };
    case types.FETCH_MOVIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export const getMovies = (state) => state.movies.movies;
export const getMoviesLoading = (state) => state.movies.loading;
export const getMoviesError = (state) => state.movies.error;
