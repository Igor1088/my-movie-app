import * as types from "../constants/actionTypes";
import { API_KEY } from "../constants/config";

export function fetchUser(session_id) {
  return (dispatch) => {
    dispatch(fetchUserBegin());
    fetch(
      `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${session_id}`
    )
      .then((response) => response.json())
      .then((data) => {
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
  return (dispatch) => {
    const sessionID = localStorage.session_id;
    if (sessionID) {
      dispatch(fetchUserBegin());
      fetch(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${sessionID}`
      )
        .then((response) => response.json())
        .then((data) => {
          dispatch(fetchUserSuccess(data));
          localStorage.setItem("user_id", data.id);
          dispatch(fetchUserData("favorite", "movies"));
          // dispatch(fetchUserData(data.id, "favorite", "tv"));
          // dispatch(fetchUserData(data.id, "watchlist", "movies"));
          // dispatch(fetchUserData(data.id, "watchlist", "tv"));
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

export function userListAction(id, mediaType, like) {
  return function (dispatch, getState) {
    const sessionID = localStorage.getItem("session_id");
    const userID = localStorage.getItem("user_id");
    let inList;

    if (mediaType === "movie") {
      inList = getState().userData.favorite.movies.results.some(
        (r) => r.id === Number(id)
      );
    }

    // if (mediaType === "tv") {
    //   inList = getState().userData.data.favorite.tv.results.some(
    //     (r) => r.id === Number(id)
    //   );
    // }

    // const like = inList ? false : true;

    fetch(
      `https://api.themoviedb.org/3/account/${userID}/favorite?api_key=${API_KEY}&session_id=${sessionID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          media_type: mediaType,
          media_id: id,
          favorite: like,
        }),
      }
    );
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
