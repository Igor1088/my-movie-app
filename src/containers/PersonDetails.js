import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getPersonDetailsError,
  getPersonDetails,
  getPersonDetailsLoading,
} from "../reducers/person-details";
import Loader from "../components/Loader";
import PersonInfo from "../components/PersonInfo";
import Credits from "../components/Credits";
import Item from "../components/Item";
import Sidebar from "../components/Sidebar";
import Section from "../components/Section";

class PersonDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: "movies",
    };
  }
  componentDidMount() {
    this.props.fetchPersonDetails(this.props.match.params.id);
  }

  changeCreditsList = (e) => {
    this.setState({ selectedOption: e.target.textContent.toLowerCase() });
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
        .slice(0, 21)
        .map((i) => {
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
      personDetails.movie_credits.cast.map((c) => movieCreditsCastList.push(c));
      personDetails.movie_credits.crew.map((c) => movieCreditsCrewList.push(c));
    }

    if (personDetails.tv_credits) {
      personDetails.tv_credits.cast.map((c) => tvCreditsCastList.push(c));
      personDetails.tv_credits.crew.map((c) => movieCreditsCrewList.push(c));
    }

    return (
      <div>
        <PersonInfo
          name={personDetails.name}
          poster={personDetails.profile_path}
          biography={personDetails.biography}
          social={personDetails.external_ids}
        />

        <main className="main">
          <Sidebar
            birthday={personDetails.birthday}
            gender={personDetails.gender}
            imdbId={personDetails.imdb_id}
            homepage={personDetails.homepage}
            knownForDepartment={personDetails.known_for_department}
            placeOfBirth={personDetails.place_of_birth}
            movieCredits={personDetails.movie_credits}
            tvCredits={personDetails.tv_credits}
            media="person"
          />
          <div className="main__content">
            <Section heading="Known For">
              <div className="grid">{credits}</div>
            </Section>
            <div className="credits">
              {this.state.selectedOption === "movies" ? (
                <div className="credits__options">
                  <div
                    className="credits__options-item selected"
                    onClick={this.changeCreditsList}
                  >
                    Movies
                  </div>
                  <div
                    className={`credits__options-item`}
                    onClick={this.changeCreditsList}
                  >
                    Tv Shows
                  </div>
                </div>
              ) : (
                <div className="credits__options">
                  <div
                    className={`credits__options-item`}
                    onClick={this.changeCreditsList}
                  >
                    Movies
                  </div>
                  <div
                    className="credits__options-item selected"
                    onClick={this.changeCreditsList}
                  >
                    Tv Shows
                  </div>
                </div>
              )}

              {this.state.selectedOption === "movies" ? (
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
        </main>
      </div>
    );
  }
}

PersonDetails.defaultProps = {
  personDetails: [],
};

PersonDetails.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  error: getPersonDetailsError(state),
  personDetails: getPersonDetails(state),
  loading: getPersonDetailsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPersonDetails: bindActionCreators(actions.fetchPersonDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PersonDetails);
