import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { fetchUser } from "./user";
import { handleErrors } from "../utils/helpers";

export function requestLogin(username, password) {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(authenticateToken(username, password, data.request_token));
      });
  };
}

export function authenticateToken(username, password, token) {
  return (dispatch) => {
    fetch(
      `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          request_token: token,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status_code) {
          console.log(data.status_message);
          dispatch(createSessionError(data.status_message));
        } else {
          dispatch(createSession(data.request_token));
        }
      });
  };
}

export function createSession(token) {
  return (dispatch) => {
    createSessionBegin();
    fetch(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${token}`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        if (!data.failure) {
          localStorage.setItem("session_id", data.session_id);
          dispatch(createSessionSuccess(data));
          dispatch(fetchUser(data.session_id));
        }
        return;
      })
      .catch((error) => {
        dispatch(createSessionError(error));
      });
  };
}

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(deleteSession());
  dispatch(deleteUser());
};

const createSessionBegin = () => ({ type: types.CREATE_SESSION_BEGIN });

const createSessionSuccess = (session) => ({
  type: types.CREATE_SESSION_SUCCESS,
  payload: session,
});

const createSessionError = (error) => ({
  type: types.CREATE_SESSION_ERROR,
  payload: error,
});

const deleteSession = () => ({ type: types.DELETE_SESSION });

const deleteUser = () => ({ type: types.DELETE_USER });
