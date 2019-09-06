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

class People extends Component {
  componentDidMount() {
    this.props.fetchPeople();
  }

  render() {
    const { error, loading, people } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;

    if (people.length !== 0) {
      items = people.map(person => {
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

    console.log("people", this.props);

    return (
      <div>
        <h3 className="row__title">Popular People</h3>
        <div className="row">{items}</div>
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

function mapDispatchToProps(dispatch) {
  return {
    fetchPeople: bindActionCreators(actions.fetchPeople, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
