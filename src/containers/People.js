import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getPeopleError,
  getPeople,
  getPeopleLoading,
} from "../reducers/people";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";
import Filter from "../components/Filter";
import Grid from "../components/Grid";

class People extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      current: 1,
      filter: "day",
    };
  }

  componentDidMount() {
    this.props.fetchPeople(
      this.state.current,
      this.props.category,
      this.state.filter
    );
  }

  handlePageClick = (page) => {
    this.setState({ current: page });
    this.props.fetchPeople(page, this.props.category, this.state.filter);
    window.scrollTo(0, this.myRef.current.offsetTop);
  };

  handleFilterClick = (filterValue) => {
    // const filterValue = e.target.textContent.toLowerCase();
    this.setState({ filter: filterValue });

    if (this.state.filter !== filterValue) {
      this.props.fetchPeople(
        this.state.current,
        this.props.category,
        filterValue
      );
    }
  };

  render() {
    const {
      error,
      loading,
      people,
      heading,
      filters,
      preview,
      previewItemsCount = 7,
    } = this.props;
    const totalPages = people.total_pages;
    let items = people.results ? people.results : [];

    if (preview) {
      items = items.slice(0, previewItemsCount);
    }

    if (error) {
      return <div>Error!</div>;
    }

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
        {loading ? <Loader /> : <Grid items={items} media="person" />}
        {!preview && (
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

People.propTypes = {
  people: PropTypes.array,
  loading: PropTypes.bool,
  heading: PropTypes.string,
};

const mapStateToProps = (state) => ({
  error: getPeopleError(state),
  loading: getPeopleLoading(state),
  people: getPeople(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPeople: bindActionCreators(actions.fetchPeople, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
