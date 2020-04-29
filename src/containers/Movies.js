import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getMoviesError,
  getMovies,
  getMoviesLoading,
} from "../reducers/movies";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";
import Filter from "../components/Filter";
import Grid from "../components/Grid";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      current: 1,
      filter: "day",
    };
  }

  componentDidMount() {
    this.props.fetchMovies(
      this.props.category,
      this.state.current,
      this.state.filter
    );
  }

  handlePageClick = (page) => {
    this.setState({ current: page });
    this.props.fetchMovies(this.props.category, page, this.state.filter);
    window.scrollTo(0, this.myRef.current.offsetTop);
  };

  handleFilterClick = (e) => {
    const filterValue = e.target.textContent.toLowerCase();
    this.setState({ filter: filterValue });

    if (this.state.filter !== filterValue) {
      this.props.fetchMovies(
        this.props.category,
        this.state.current,
        filterValue
      );
    }
  };

  render() {
    const { error, loading, movies, heading, filters } = this.props;
    const totalPages = movies.total_pages;
    const items = movies.results;

    if (error) {
      return <div>Error!</div>;
    }

    return (
      <div ref={this.myRef}>
        <div className="row__head">
          <h3 className="row__title">{heading}</h3>
          {filters ? (
            <Filter
              filter={this.state.filter}
              handleFilterClick={this.handleFilterClick}
            />
          ) : null}
        </div>
        {!loading ? <Loader /> : <Grid items={items} media="movie" />}
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

Movies.defaultProps = {
  movies: [],
};

Movies.propTypes = {
  // movies: PropTypes.object,
  loading: PropTypes.bool,
  category: PropTypes.string,
  heading: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: getMoviesError(state),
  loading: getMoviesLoading(state),
  movies: getMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: bindActionCreators(actions.fetchMovies, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
