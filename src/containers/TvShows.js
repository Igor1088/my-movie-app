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
import Pagination from "rc-pagination";

class TvShows extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1
    };
  }

  componentDidMount() {
    this.props.fetchTvShows(this.props.category, this.state.current);
  }

  handlePageClick = page => {
    this.setState({ current: page });
    this.props.fetchTvShows(this.props.category, page);
  };

  render() {
    const { error, loading, tvShows, heading } = this.props;
    const totalPages = tvShows.total_pages;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;

    if (tvShows.results) {
      items = tvShows.results.map(tv => {
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
        <h3 className="row__title">{heading}</h3>
        <div className="row">{items}</div>
        <div className="pagination">
          <Pagination
            onChange={this.handlePageClick}
            current={this.state.current}
            total={totalPages}
          />
        </div>
      </div>
    );
  }
}

TvShows.defaultProps = {
  tvShows: []
};

TvShows.propTypes = {
  // tvShows: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
