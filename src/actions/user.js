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

export function fetchUserData(category, type, sort) {
  return dispatch => {
    const sessionID = localStorage.getItem("session_id");

    dispatch(fetchUserDataBegin());
    fetch(
      `https://api.themoviedb.org/3/account/{account_id}/${category}/${type}?api_key=${API_KEY}&session_id=${sessionID}&language=en-US&sort_by=created_at.${sort}&page=1`
    )
      .then(res => res.json())
      .then(data => {
        console.log("favmovies", data);
        dispatch(fetchUserDataSuccess(data));
      });
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

const fetchUserDataBegin = () => ({
  type: types.FETCH_USER_DATA_BEGIN
});

const fetchUserDataSuccess = user => ({
  type: types.FETCH_USER_DATA_SUCCESS,
  payload: user
});

const fetchUserDataError = error => ({
  type: types.FETCH_USER_DATA_ERROR,
  payload: error
});

// const fetchFavMoviesBegin = () => ({
//   type: types.FETCH_FAV_MOVIES_BEGIN
// });

// const fetchFavMoviesSuccess = movies => ({
//   type: types.FETCH_FAV_MOVIES_SUCCESS,
//   payload: movies
// });

// const fetchFavMoviesError = error => ({
//   type: types.FETCH_FAV_MOVIES_ERROR,
//   payload: error
// });
