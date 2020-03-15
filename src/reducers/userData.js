import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_DATA_BEGIN:
      return {
        ...state,
        loading: true,
        data: {},
        error: null
      };
    case types.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case types.FETCH_USER_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export const getUserData = state => state.userData.data;
export const getUserDataLoading = state => state.userData.loading;
export const getUserDataError = state => state.userData.error;
