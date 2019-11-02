import React from "react";
import Movies from "../containers/Movies";
import Navigation from "./Navigation";
import Home from "../components/Home";
import TvShows from "../containers/TvShows";
import MovieDetails from "../containers/MovieDetails";
import PersonDetails from "../containers/PersonDetails";
import TvShowDetails from "../containers/TvShowDetails";
import People from "../containers/People";
import SeasonDetails from "../containers/SeasonDetails";
import { BrowserRouter, Route } from "react-router-dom";

function App({ children }) {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="container">
          <Navigation />

          <Route exact path="/" component={Home} />
          <Route
            path="/movies/popular"
            render={props => (
              <Movies {...props} category="popular" heading="Popular Movies" />
            )}
          />
          <Route
            path="/movies/upcoming"
            render={props => (
              <Movies
                {...props}
                category="upcoming"
                heading="Upcoming Movies"
              />
            )}
          />
          <Route
            path="/movies/top-rated"
            render={props => (
              <Movies
                {...props}
                category="top_rated"
                heading="Top Rated Movies"
              />
            )}
          />
          <Route
            path="/movies/now-playing"
            render={props => (
              <Movies
                {...props}
                category="now_playing"
                heading="Now Playing Movies"
              />
            )}
          />
          <Route
            path="/tv-show/popular"
            render={props => (
              <TvShows
                {...props}
                category="popular"
                heading="Popular TV Shows"
              />
            )}
          />
          <Route
            path="/tv-show/top-rated"
            render={props => (
              <TvShows
                {...props}
                category="top_rated"
                heading="Top Rated Tv Shows"
              />
            )}
          />
          <Route
            path="/tv-show/on-tv"
            render={props => (
              <TvShows
                {...props}
                category="on_the_air"
                heading="Currently Airing TV Shows"
              />
            )}
          />
          <Route
            path="/tv-show/airing-today"
            render={props => (
              <TvShows
                {...props}
                category="airing_today"
                heading="TV Shows Airing Today"
              />
            )}
          />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route exact path="/tv/:id" component={TvShowDetails} />
          <Route path="/people" component={People} />
          <Route path="/person/:id" component={PersonDetails} />
          <Route
            exact
            path="/tv/:id/season/:seasonNumber"
            component={SeasonDetails}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
