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
    const { error, loading, tvShows, heading } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;

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
            hoverClass="item__hover"
          />
        );
      });
    }
    return (
      <div>
        <h3 className="row__title">{heading}</h3>
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
  loading: getTvShowsLoading(state),
  tvShows: getTvShows(state)
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
