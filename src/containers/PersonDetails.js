import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getPersonDetailsError,
  getPersonDetails,
  getPersonDetailsLoading
} from "../reducers/person-details";
import Loader from "../components/Loader";
import PersonInfo from "../components/PersonInfo";
import PersonData from "../components/PersonData";
import CreditsList from "../components/CreditsList";
import Item from "../components/Item";

class PersonDetails extends Component {
  componentDidMount() {
    this.props.fetchPersonDetails(this.props.match.params.id);
  }

  render() {
    const { error, loading, personDetails } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let movies;

    if (personDetails.movie_credits) {
      movies = personDetails.movie_credits.cast
        .filter(m => m.popularity > 5)
        .slice(0, 12)
        .map(movie => {
          return (
            <Item
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              vote_average={movie.vote_average}
              media="movie"
              hoverClass="item__hover"
            />
          );
        });
    }

    return (
      <div>
        <PersonInfo
          name={personDetails.name}
          poster={personDetails.profile_path}
          biography={personDetails.biography}
          social={personDetails.external_ids}
        />

        <div className="person__container">
          <div className="person__sidebar">
            <h4>Personal Info</h4>
            <PersonData {...personDetails} />
          </div>
          <div className="person__main">
            <h4>Known For</h4>
            <div className="row">{movies}</div>
            <CreditsList
              credits={
                personDetails.movie_credits
                  ? personDetails.movie_credits.cast
                  : []
              }
              media="movie"
              heading="Acting"
            />
            <CreditsList
              credits={
                personDetails.movie_credits
                  ? personDetails.movie_credits.crew.filter(
                      c => c.department === "Directing"
                    )
                  : []
              }
              media="movie"
              heading="Directing"
            />
            <CreditsList
              credits={
                personDetails.movie_credits
                  ? personDetails.movie_credits.crew.filter(
                      c => c.department === "Production"
                    )
                  : []
              }
              media="movie"
              heading="Production"
            />
            <CreditsList
              credits={
                personDetails.movie_credits
                  ? personDetails.movie_credits.crew.filter(
                      c => c.department === "Writing"
                    )
                  : []
              }
              media="movie"
              heading="Writing"
            />
          </div>
        </div>
      </div>
    );
  }
}

PersonDetails.defaultProps = {
  personDetails: []
};

PersonDetails.propTypes = {
  personDetails: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  error: getPersonDetailsError(state),
  personDetails: getPersonDetails(state),
  loading: getPersonDetailsLoading(state)
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPersonDetails: bindActionCreators(actions.fetchPersonDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonDetails);
