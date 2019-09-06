import { combineReducers } from "redux";
import movies from "./movies";
import tvShows from "./tv-shows";
import people from "./people";
import movieDetails from "./movie-details";
import tvShowDetails from "./tvshow-details";
import personDetails from "./person-details";

const rootReducer = combineReducers({
  movies,
  movieDetails,
  tvShows,
  tvShowDetails,
  people,
  personDetails
});

export default rootReducer;
