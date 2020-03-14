import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchUser(session_id) {
  return dispatch => {
    dispatch(fetchUserBegin());
    fetch(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${session_id}`
    )
      .then(res => res.json())
      .then(data => {
        dispatch(fetchUserSuccess(data));
        // if (data.status_message) {
        //   dispatch(fetchUserError(data));
        // } else {
        // }
        // return data;
      });
  };
}

export function fetchLoggedUser() {
  return dispatch => {
    const sessionID = localStorage.session_id;
    if (sessionID) {
      dispatch(fetchUserBegin());
      fetch(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionID}`
      )
        .then(res => res.json())
        .then(data => {
          dispatch(fetchUserSuccess(data));
          // if (data) {
          //   dispatch(fetchUserError(data.status_message));
          // } else {
          // }
        });
    }
  };
}

const fetchUserBegin = () => ({
  type: types.FETCH_USER_BEGIN
});

const fetchUserSuccess = user => ({
  type: types.FETCH_USER_SUCCESS,
  payload: user
});

const fetchUserError = error => ({
  type: types.FETCH_USER_ERROR,
  payload: error
});
