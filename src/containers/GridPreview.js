import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getMoviesError,
  getMovies,
  getMoviesLoading,
} from "../reducers/movies";
import {
  getTvShowsError,
  getTvShows,
  getTvShowsLoading,
} from "../reducers/tv-shows";
import Loader from "../components/Loader";
import Grid from "../components/Grid";

class GridPreview extends Component {
  componentDidMount() {
    if (this.props.media === "movie") {
      this.props.fetchMovies(this.props.category);
    } else {
      this.props.fetchTvShows(this.props.category);
    }
  }

  render() {
    const { loading, movies, tvShows, category, media, heading } = this.props;
    let items;

    if (media === "movie") {
      items = movies[category] ? movies[category].results : [];
    } else {
      items = tvShows[category] ? tvShows[category].results : [];
    }

    return (
      <Fragment>
        <div className="home-preview__heading">
          <h3 class="row__title">{heading}</h3>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <Grid items={items.slice(0, 7)} media={media} preview={true} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getMoviesError(state),
  loading: getMoviesLoading(state),
  movies: getMovies(state),
  errorTv: getTvShowsError(state),
  loadingTv: getTvShowsLoading(state),
  tvShows: getTvShows(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: bindActionCreators(actions.fetchMovies, dispatch),
  fetchTvShows: bindActionCreators(actions.fetchTvShows, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridPreview);
