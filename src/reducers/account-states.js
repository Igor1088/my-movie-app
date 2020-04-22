import * as types from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: {},
  error: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FETCH_ACC_STATES_BEGIN:
      return {
        ...state,
        loading: true,
        data: {},
        error: false,
      };
    case types.FETCH_ACC_STATES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case types.FETCH_ACC_STATES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getAccountStatesLoading = (state) => state.accountStates.loading;
export const getAccountStatesError = (state) => state.accountStates.error;
export const getAccountStates = (state) => state.accountStates.data;
