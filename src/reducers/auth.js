import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  session: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_SESSION_BEGIN:
      return {
        ...state,
        loading: true
      };
    case types.CREATE_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
        session: action.payload.session_id
      };
    case types.CREATE_SESSION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case types.DELETE_SESSION:
      return {
        ...state,
        session: null
      };
    default:
      return state;
  }
}

export const getSession = state => state.auth.session;
