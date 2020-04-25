import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";
import { handleErrors } from "../utils/helpers";

export function fetchUser(session_id) {
  return (dispatch) => {
    dispatch(fetchUserBegin());
    fetch(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${session_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchUserSuccess(data));
      });
  };
}

export function fetchLoggedUser() {
  return (dispatch) => {
    const sessionID = localStorage.session_id;
    if (sessionID) {
      dispatch(fetchUserBegin());
      fetch(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionID}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status_code) {
            console.log(data.status_message);
            dispatch(fetchUserError(data.status_message));
          } else {
            dispatch(fetchUserSuccess(data));
            localStorage.setItem("user_id", data.id);
          }
          // dispatch(fetchUserData("favorite", "movies"));
          // dispatch(fetchUserData("favorite", "tv"));
          // dispatch(fetchUserData("watchlist", "movies"));
          // dispatch(fetchUserData("watchlist", "tv"));
        })
        .catch((error) => {
          dispatch(fetchUserError(error));
        });
    }
  };
}

export function fetchUserData(category, media, sort) {
  sort = sort ? sort : "desc";
  return (dispatch) => {
    const sessionID = localStorage.getItem("session_id");
    const accountID = localStorage.getItem("user_id");

    dispatch(fetchUserDataBegin());
    fetch(
      `https://api.themoviedb.org/3/account/${accountID}/${category}/${media}?api_key=${API_KEY}&session_id=${sessionID}&sort_by=created_at.${sort}&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchUserDataSuccess(data, category, media));
      })
      .catch((error) => {
        dispatch(fetchUserDataError(error));
      });
  };
}

export function userListAction(id, list, mediaType, like) {
  return (dispatch) => {
    const sessionID = localStorage.getItem("session_id");
    const userID = localStorage.getItem("user_id");
    // const media = mediaType === "movie" ? "movies" : "tv";

    fetch(
      `https://api.themoviedb.org/3/account/${userID}/${list}?api_key=${API_KEY}&session_id=${sessionID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: id,
          [list]: like,
        }),
      }
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        // dispatch(fetchUserData(list, media));
        dispatch(fetchAccountStates(id, mediaType));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
}

export function userRateAction(id, mediaType, rating) {
  return (dispatch) => {
    const sessionID = localStorage.getItem("session_id");
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/rating?api_key=${API_KEY}&session_id=${sessionID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: rating,
        }),
      }
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchAccountStates(id, mediaType));
      });
  };
}

export function deleteRating(id, mediaType) {
  return (dispatch) => {
    const sessionID = localStorage.getItem("session_id");
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/rating?api_key=${API_KEY}&session_id=${sessionID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(function () {
          dispatch(fetchAccountStates(id, mediaType));
        }, 700);
      });
  };
}

export function fetchAccountStates(id, mediaType) {
  return (dispatch) => {
    const sessionID = localStorage.getItem("session_id");

    dispatch(fetchAccountStatesBegin());
    fetch(
      `https://api.themoviedb.org/3/${mediaType}/${id}/account_states?api_key=${API_KEY}&language=en-US&session_id=${sessionID}`
    )
      .then(handleErrors)
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchAccountStatesSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchAccountStatesError(error));
      });
  };
}

const fetchUserBegin = () => ({
  type: types.FETCH_USER_BEGIN,
});

const fetchUserSuccess = (user) => ({
  type: types.FETCH_USER_SUCCESS,
  payload: user,
});

const fetchUserError = (error) => ({
  type: types.FETCH_USER_ERROR,
  payload: error,
});

const fetchUserDataBegin = () => ({
  type: types.FETCH_USER_DATA_BEGIN,
});

const fetchUserDataSuccess = (user, category, media) => ({
  type: types.FETCH_USER_DATA_SUCCESS,
  payload: user,
  category: category,
  media: media,
});

const fetchUserDataError = (error) => ({
  type: types.FETCH_USER_DATA_ERROR,
  payload: error,
});

const fetchAccountStatesBegin = () => ({
  type: types.FETCH_ACC_STATES_BEGIN,
});

const fetchAccountStatesSuccess = (data) => ({
  type: types.FETCH_ACC_STATES_SUCCESS,
  payload: data,
});

const fetchAccountStatesError = (error) => ({
  type: types.FETCH_ACC_STATES_ERROR,
  payload: error,
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
