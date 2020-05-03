import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getTvShowsError,
  getTvShows,
  getTvShowsLoading,
} from "../reducers/tv-shows";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";
import Filter from "../components/Filter";
import Grid from "../components/Grid";

class TvShows extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      current: 1,
      filter: "day",
    };
  }

  componentDidMount() {
    this.props.fetchTvShows(
      this.props.category,
      this.state.current,
      this.state.filter
    );
  }

  handlePageClick = (page) => {
    this.setState({ current: page });
    this.props.fetchTvShows(this.props.category, page, this.state.filter);
    window.scrollTo(0, this.myRef.current.offsetTop);
    // this.myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  handleFilterClick = (filterValue) => {
    // const filterValue = e.target.textContent.toLowerCase();
    this.setState({ filter: filterValue });

    if (this.state.filter !== filterValue) {
      this.props.fetchTvShows(
        this.props.category,
        this.state.current,
        filterValue
      );
    }
  };

  render() {
    const {
      error,
      loading,
      tvShows,
      heading,
      filters,
      category,
      preview,
      previewItemsCount = 7,
    } = this.props;
    const totalPages = tvShows[category] ? tvShows[category].total_pages : 0;
    let items = tvShows[category] ? tvShows[category].results : [];

    if (preview) {
      items = items.slice(0, previewItemsCount);
    }

    if (error) {
      return <div>Error!</div>;
    }

    // if (tvShows.results) {
    // items = tvShows.results.map((tv) => {
    //   return (
    //     <Item
    //       key={tv.id}
    //       id={tv.id}
    //       poster={tv.poster_path}
    //       title={tv.name}
    //       vote_average={tv.vote_average}
    //       media="tv"
    //       year={tv.first_air_date}
    //     />
    //   );
    // });
    // }

    return (
      <section ref={this.myRef} className={preview ? "section-preview" : null}>
        <div className="row__head">
          <h3 className="row__title">{heading}</h3>
          {filters ? (
            <Filter
              filter={this.state.filter}
              handleFilterClick={this.handleFilterClick}
            />
          ) : null}
        </div>
        {/* <div className="grid">{items}</div> */}
        {loading ? <Loader /> : <Grid items={items} media="tv" />}
        {preview ? null : (
          <div className="pagination">
            <Pagination
              onChange={this.handlePageClick}
              current={this.state.current}
              total={totalPages}
            />
          </div>
        )}
      </section>
    );
  }
}

TvShows.defaultProps = {
  tvShows: [],
};

TvShows.propTypes = {
  // tvShows: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  error: getTvShowsError(state),
  loading: getTvShowsLoading(state),
  tvShows: getTvShows(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTvShows: bindActionCreators(actions.fetchTvShows, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShows);
