import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  user: {},
  authorized: false,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_USER_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        authorized: true
      };
    case types.FETCH_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_USER:
      return {
        ...state,
        loading: false,
        user: {},
        error: null,
        authorized: false
      };
    default:
      return state;
  }
}

export const getUser = state => state.user.user;
export const getUserLoading = state => state.user.loading;
export const getUserError = state => state.user.error;
export const getUserAuthorization = state => state.user.authorized;
