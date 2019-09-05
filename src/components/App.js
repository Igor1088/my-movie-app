import React from "react";
import Movies from "../containers/Movies";
import Navigation from "./Navigation";
import Home from "../components/Home";
import TvShows from "../containers/TvShows";
import MovieDetails from "../containers/MovieDetails";
import PersonDetails from "../containers/PersonDetails";
import TvShowDetails from "../containers/TvShowDetails";
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
              <Movies {...props} category="popular" heading="Popular" />
            )}
          />
          <Route
            path="/movies/upcoming"
            render={props => (
              <Movies {...props} category="upcoming" heading="Upcoming" />
            )}
          />
          <Route
            path="/movies/top_rated"
            render={props => (
              <Movies {...props} category="top_rated" heading="Top Rated" />
            )}
          />
          <Route
            path="/tvshows"
            render={props => <TvShows {...props} category="on_the_air" />}
          />
          <Route path="/movieDetails" component={MovieDetails} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/person/:id" component={PersonDetails} />
          <Route path="/tv/:id" component={TvShowDetails} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
