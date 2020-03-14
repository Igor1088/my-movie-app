import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { fetchUser } from "./user";

export function requestLogin() {
  let win = window.open("", "_blank");
  return dispatch => {
    fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("token", data.request_token);
        win.location = `https://www.themoviedb.org/authenticate/${data.request_token}`;
        let timer = setInterval(function() {
          if (win.closed) {
            clearInterval(timer);
            dispatch(createSession(data.request_token));
          }
        }, 0);
      });
  };
}

export function createSession(token) {
  // let sessionID;
  return dispatch => {
    createSessionBegin();
    fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${token}`
    )
      .then(res => res.json())
      .then(data => {
        if (!data.failure) {
          localStorage.setItem("session_id", data.session_id);
          dispatch(createSessionSuccess(data));
          dispatch(fetchUser(data.session_id));
          // sessionID = data.sessionID;
        }
        return;
        // setTimeout(function() {
        //     dispatch(fetchUser(sessionID));
        // }, 1000);
      })
      .catch(error => {
        dispatch(createSessionError(error));
      });
  };
}

export const logout = () => dispatch => {
  localStorage.clear();
  dispatch(deleteSession());
  dispatch(deleteUser());
};

function createSessionBegin() {
  return {
    type: types.CREATE_SESSION_BEGIN
  };
}

function createSessionSuccess(session) {
  return {
    type: types.CREATE_SESSION_SUCCESS,
    payload: session
  };
}

function createSessionError(error) {
  return {
    type: types.CREATE_SESSION_ERROR,
    payload: error
  };
}

function deleteSession() {
  return {
    type: types.DELETE_SESSION
  };
}

function deleteUser() {
  return {
    type: types.DELETE_USER
  };
}
