import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getPeopleError,
  getPeople,
  getPeopleLoading
} from "../reducers/people";
import Person from "../components/Person";
import Item from "../components/Item";
import Loader from "../components/Loader";
import Pagination from "rc-pagination";

class People extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 1,
      filter: "day"
    };
  }

  componentDidMount() {
    this.props.fetchPeople(
      this.state.current,
      this.props.category,
      this.state.filter
    );
  }

  handlePageClick = page => {
    this.setState({ current: page });
    this.props.fetchPeople(page, this.props.category, this.state.filter);
  };

  handleFilterClick = e => {
    const filterValue = e.target.textContent.toLowerCase();
    this.setState({ filter: filterValue });

    if (this.state.filter != filterValue) {
      this.props.fetchPeople(
        this.state.current,
        this.props.category,
        filterValue
      );
    }
  };

  render() {
    const { error, loading, people, heading, filters } = this.props;
    const totalPages = people.total_pages;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;

    if (people.results) {
      items = people.results.map(person => {
        return (
          <Item
            key={person.id}
            id={person.id}
            name={person.name}
            poster={person.profile_path}
            title={person.name}
            media="person"
          />
        );
      });
    }

    return (
      <div>
        <div className="row__head">
          <h3 className="row__title">{heading ? heading : "Popular People"}</h3>
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

People.propTypes = {
  people: PropTypes.array,
  loading: PropTypes.bool,
  heading: PropTypes.string
};

const mapStateToProps = state => ({
  error: getPeopleError(state),
  loading: getPeopleLoading(state),
  people: getPeople(state)
});

const mapDispatchToProps = dispatch => ({
  fetchPeople: bindActionCreators(actions.fetchPeople, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(People);
