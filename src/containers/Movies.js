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
      current: 1
    };
  }
  componentDidMount() {
    this.props.fetchMovies(this.props.category, this.state.current);
  }

  handlePageClick = page => {
    this.setState({ current: page });
    this.props.fetchMovies(this.props.category, page);
  };

  render() {
    const { error, loading, movies, heading } = this.props;
    const totalPages = movies.total_pages;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;

    if (movies.results) {
      items = movies.results.map(movie => {
        return (
          <Item
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            media="movie"
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

function mapDispatchToProps(dispatch) {
  return {
    fetchMovies: bindActionCreators(actions.fetchMovies, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
