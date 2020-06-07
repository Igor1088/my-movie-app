import { combineReducers } from "redux";
import movies from "./movies";
import tvShows from "./tv-shows";
import people from "./people";
import movieDetails from "./movie-details";
import tvShowDetails from "./tvshow-details";
import personDetails from "./person-details";
import seasonDetails from "./tv-season";
import auth from "./auth";
import user from "./user";
import userData from "./userData";
import search from "./search";
import accountStates from "./account-states";
import discover from "./discover";

const rootReducer = combineReducers({
  movies,
  movieDetails,
  tvShows,
  tvShowDetails,
  people,
  personDetails,
  seasonDetails,
  auth,
  user,
  userData,
  search,
  accountStates,
  discover,
});

export default rootReducer;
