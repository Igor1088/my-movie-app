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
import Credits from "../components/Credits";
import Item from "../components/Item";

class PersonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creditsList: true
    };
  }
  componentDidMount() {
    this.props.fetchPersonDetails(this.props.match.params.id);
  }

  changeCreditsList = () => {
    this.setState({ creditsList: !this.state.creditsList });
  };

  render() {
    const { error, loading, personDetails } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let credits;
    let movieCreditsCastList = [];
    let movieCreditsCrewList = [];
    let tvCreditsCastList = [];
    let tvCreditsCrewList = [];

    if (personDetails.combined_credits) {
      credits = personDetails.combined_credits.cast
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 18)
        .map(i => {
          return (
            <Item
              key={i.id}
              id={i.id}
              poster={i.poster_path}
              title={i.title || i.name}
              vote_average={i.vote_average}
              media={i.media_type}
            />
          );
        });
    }

    if (personDetails.movie_credits) {
      personDetails.movie_credits.cast.map(c => movieCreditsCastList.push(c));
      personDetails.movie_credits.crew.map(c => movieCreditsCrewList.push(c));
    }

    if (personDetails.tv_credits) {
      personDetails.tv_credits.cast.map(c => tvCreditsCastList.push(c));
      personDetails.tv_credits.crew.map(c => movieCreditsCrewList.push(c));
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
            <div className="row">{credits}</div>
            <div className="credits">
              <div className="credits__options">
                <div
                  className={`credits__options-item ${
                    this.state.creditsList ? "selected" : ""
                  }`}
                  onClick={this.changeCreditsList}
                >
                  Movies
                </div>
                <div
                  className={`credits__options-item ${
                    this.state.creditsList ? "" : "selected"
                  }`}
                  onClick={this.changeCreditsList}
                >
                  TV Shows
                </div>
              </div>
              {this.state.creditsList ? (
                <Credits
                  creditsCast={movieCreditsCastList}
                  creditsCrew={movieCreditsCrewList}
                  media="movie"
                />
              ) : (
                <Credits
                  creditsCast={tvCreditsCastList}
                  creditsCrew={tvCreditsCrewList}
                  media="tv"
                />
              )}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);
