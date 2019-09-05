import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  tvShow: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SHOW_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_SHOW_SUCCESS:
      return {
        ...state,
        loading: false,
        tvShow: action.payload
      };
    case types.FETCH_SHOW_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export const getTvShowDetails = state => state.tvShowDetails.tvShow;
export const getTvShowDetailsLoading = state => state.tvShowDetails.loading;
export const getTvShowDetailsError = state => state.tvShowDetails.error;
