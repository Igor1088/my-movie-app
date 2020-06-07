import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_DISCOVER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_DISCOVER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.FETCH_DISCOVER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export const getDiscover = (state) => state.discover.data;
export const getDiscoverLoading = (state) => state.discover.loading;
export const getDiscoverError = (state) => state.discover.error;
