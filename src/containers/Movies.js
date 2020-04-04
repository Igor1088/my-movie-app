import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getMoviesError,
  getMovies,
  getMoviesLoading
} from "../reducers/movies";
import Item from "../components/Item";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      filter: "day"
    };
  }

  componentDidMount() {
    this.props.fetchMovies(
      this.props.category,
      this.state.current,
      this.state.filter
    );
  }

  handlePageClick = page => {
    this.setState({ current: page });
    this.props.fetchMovies(this.props.category, page, this.state.filter);
  };

  handleFilterClick = e => {
    const filterValue = e.target.textContent.toLowerCase();
    this.setState({ filter: filterValue });

    if (this.state.filter != filterValue) {
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
    let items;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    if (movies.results) {
      items = movies.results.map(movie => {
        return (
          <Item
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            media={"movie"}
          />
        );
      });
    }
    return (
      <div>
        <div className="row__head">
          <h3 className="row__title">{heading}</h3>
          {filters ? (
            <div className="row__filter">
              <div
                className={`row__filter-item ${
                  this.state.filter === "day" ? "active" : ""
                }`}
                onClick={this.handleFilterClick}
              >
                Day
              </div>
              <div
                className={`row__filter-item ${
                  this.state.filter === "week" ? "active" : ""
                }`}
                onClick={this.handleFilterClick}
              >
                Week
              </div>
            </div>
          ) : null}
        </div>
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

Movies.defaultProps = {
  movies: []
};

Movies.propTypes = {
  // movies: PropTypes.object,
  loading: PropTypes.bool,
  category: PropTypes.string,
  heading: PropTypes.string
};

const mapStateToProps = state => ({
  error: getMoviesError(state),
  loading: getMoviesLoading(state),
  movies: getMovies(state)
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: bindActionCreators(actions.fetchMovies, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
