import * as types from "../constants/actionTypes";

const initialState = {
  laoding: false,
  people: [],
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PEOPLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };
    case types.FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        loading: false,
        people: action.payload
      };
    case types.FETCH_PEOPLE_ERROR:
      return {
        ...state,
        laoding: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export const getPeople = state => state.people.people;
export const getPeopleLoading = state => state.people.loading;
export const getPeopleError = state => state.people.error;
