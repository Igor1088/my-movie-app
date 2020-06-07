import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getDiscoverError,
  getDiscover,
  getDiscoverLoading,
} from "../reducers/discover";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";
import FilterDiscover from "./FilterDiscover";
import Grid from "../components/Grid";

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      voteCount: 0,
      scoreMin: 0,
      scoreMax: 10,
      runtimeMin: 0,
      runtimeMax: 400,
      showFilters: false,
      sortBy: "popularity.desc",
    };
  }

  componentDidMount() {
    this.props.fetchDiscover(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.match.params.id;
    const newId = this.props.match.params.id;

    if (oldId !== newId) {
      this.props.fetchDiscover(this.props.match.params.id);
    }
  }

  handlePageClick = (page) => {
    this.setState({ current: page });
    this.props.fetchDiscover(
      this.props.match.params.id,
      this.state.voteCount,
      this.state.scoreMin,
      this.state.scoreMax,
      this.state.runtimeMin,
      this.state.runtimeMax,
      this.state.genres,
      this.state.sortBy,
      page
    );
    // window.scrollTo(0, this.myRef.current.offsetTop);
  };

  handleSubmit = (
    voteCount,
    scoreMin,
    scoreMax,
    runtimeMin,
    runtimeMax,
    genres,
    sortBy
  ) => {
    this.props.fetchDiscover(
      this.props.match.params.id,
      voteCount,
      scoreMin,
      scoreMax,
      runtimeMin,
      runtimeMax,
      genres,
      sortBy
    );

    this.setState({
      voteCount,
      scoreMin,
      scoreMax,
      runtimeMin,
      runtimeMax,
      genres,
      sortBy,
    });
  };

  render() {
    const { error, loading, preview, data = [] } = this.props;
    const items = data ? data.results : [];
    const totalPages = data.total_pages;

    if (error) {
      return <div>Error!</div>;
    }

    return (
      <section className="discover">
        <div>
          {loading ? (
            <Loader />
          ) : (
            <Grid items={items} media={this.props.match.params.id} />
          )}
          {preview ? null : (
            <div className="pagination">
              <Pagination
                onChange={this.handlePageClick}
                current={this.state.current}
                total={totalPages}
              />
            </div>
          )}
        </div>
        <div className="discover-sidebar">
          <FilterDiscover
            handleSubmit={this.handleSubmit}
            media={this.props.match.params.id}
            show={this.state.showFilters}
          />
          <div
            className="discover-toggle"
            onClick={() =>
              this.setState({ showFilters: !this.state.showFilters })
            }
          >
            {this.state.showFilters ? "Hide Filters" : "Show Filters"}
          </div>
        </div>
      </section>
    );
  }
}

Discover.propTypes = {
  loading: PropTypes.bool,
  heading: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: getDiscoverError(state),
  loading: getDiscoverLoading(state),
  data: getDiscover(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchDiscover: bindActionCreators(actions.fetchDiscover, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);
