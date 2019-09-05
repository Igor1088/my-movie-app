import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getTvShowsError,
  getTvShows,
  getTvShowsLoading
} from "../reducers/tv-shows";
import Item from "../components/Item";
import Loader from "../components/Loader";

class TvShows extends Component {
  componentDidMount() {
    this.props.fetchTvShows(this.props.category);
  }
  render() {
    const { error, loading, tvShows } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;
    console.log("tv", this.props);

    if (tvShows.length !== 0) {
      items = tvShows.map(tv => {
        return (
          <Item
            key={tv.id}
            id={tv.id}
            poster={tv.poster_path}
            title={tv.name}
            vote_average={tv.vote_average}
            media="tv"
          />
        );
      });
    }
    return (
      <div>
        <h3 className="row__title">TV Shows Airing Today</h3>
        <div className="row">{items}</div>
      </div>
    );
  }
}

TvShows.defaultProps = {
  tvShows: []
};

TvShows.propTypes = {
  tvShows: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  error: getTvShowsError(state),
  tvShows: getTvShows(state),
  loading: getTvShowsLoading(state)
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTvShows: bindActionCreators(actions.fetchTvShows, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TvShows);
