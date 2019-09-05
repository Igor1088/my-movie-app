import { combineReducers } from "redux";
import movies from "./movies";
import tvShows from "./tv-shows";
import movieDetails from "./movie-details";
import tvShowDetails from "./tvshow-details";
import personDetails from "./person-details";

const rootReducer = combineReducers({
  movies,
  movieDetails,
  tvShows,
  tvShowDetails,
  personDetails
});

export default rootReducer;
