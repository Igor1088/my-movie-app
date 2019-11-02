import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  season: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_SEASON_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_SEASON_SUCCESS:
      return {
        ...state,
        loading: false,
        season: action.payload
      };
    case types.FETCH_SEASON_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export const getSeasonDetails = state => state.seasonDetails.season;
export const getSeasonDetailsLoading = state => state.seasonDetails.loading;
export const getSeasonDetailsError = state => state.seasonDetails.error;
