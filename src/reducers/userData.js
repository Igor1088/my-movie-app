import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  favorite: {
    movies: {},
    tv: {},
  },
  watchlist: {
    movies: {},
    tv: {},
  },
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        // favorite: {
        //   movies: {},
        //   tv: {},
        // },
        // watchlist: {
        //   movies: {},
        //   tv: {},
        // },
        error: null,
      };
    case types.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        [action.category]: {
          ...state[action.category],
          [action.media]: {
            ...action.payload,
          },
        },
        // data: {
        //   ...state.data,
        //   [action.category]: {
        //     ...state.data[action.category],
        //     [action.media]: {
        //       ...action.payload,
        //     },
        //   },
        // },
      };
    case types.FETCH_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getUserData = (state) => state.userData.data;
export const getUserLists = (state) => state.userData;
export const getUserDataLoading = (state) => state.userData.loading;
export const getUserDataError = (state) => state.userData.error;
