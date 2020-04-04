import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getSearchResults,
  getSearchResultsLoading,
  getSearchResultsError
} from "../reducers/search";
import Item from "../components/Item";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1
    };
  }

  handlePageClick = page => {
    this.setState({ current: page });
    this.props.fetchSearchResults(localStorage.getItem("query"), page);
  };

  render() {
    const { loading, error, results } = this.props;
    const totalPages = results.total_pages;
    let items;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    if (results.results) {
      items = results.results.map(i => {
        return (
          <Item
            key={i.id}
            id={i.id}
            poster={i.poster_path}
            title={i.title ? i.title : i.name}
            vote_average={i.vote_average}
            media={i.media_type}
          />
        );
      });
    }

    return (
      <div>
        <div className="row__head">
          <h3 className="row__title">Search Results</h3>
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

const mapStateToProps = state => ({
  results: getSearchResults(state),
  loading: getSearchResultsLoading(state),
  error: getSearchResultsError(state)
});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: bindActionCreators(actions.fetchSearchResults, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
