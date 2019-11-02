import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getSeasonDetailsError,
  getSeasonDetails,
  getSeasonDetailsLoading
} from "../reducers/tv-season";
import Loader from "../components/Loader";
import Episode from "../components/Episode";

class SeasonDetails extends Component {
  componentDidMount() {
    this.props.fetchSeasonDetails(
      this.props.match.params.id,
      this.props.match.params.seasonNumber
    );
  }

  render() {
    const { error, loading, seasonDetails } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items;

    if (seasonDetails.episodes) {
      items = seasonDetails.episodes.map(i => (
        <Episode
          key={i.episode_number}
          name={i.name}
          voteAverage={i.vote_average}
          voteCount={i.vote_count}
          overview={i.overview}
          poster={i.still_path}
          seasonNumber={i.season_number}
          episodeNumber={i.episode_number}
          airDate={i.air_date}
        />
      ));
    }

    console.log("details", this.props.seasonDetails);
    return (
      <div className="season">
        <div className="season__heading">
          <div className="season__img-holder">
            {seasonDetails.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w154/${seasonDetails.poster_path}`}
                alt="poster"
              />
            ) : (
              ""
            )}
          </div>
          <div className="season__info">
            <h2 className="season__name">
              {seasonDetails.name}{" "}
              <span>
                (
                {seasonDetails.air_date
                  ? seasonDetails.air_date.slice(0, 4)
                  : ""}
                )
              </span>
            </h2>
            <div className="season__overview">
              <div className="season__overview-heading">
                {seasonDetails.overview ? "Overview" : ""}
              </div>
              <p>{seasonDetails.overview}</p>
            </div>
          </div>
        </div>
        {items}
      </div>
    );
  }
}

SeasonDetails.defaultProps = {
  seasonDetails: []
};

const mapStateToProps = state => ({
  error: getSeasonDetailsError(state),
  seasonDetails: getSeasonDetails(state),
  loading: getSeasonDetailsLoading(state)
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSeasonDetails: bindActionCreators(actions.fetchSeasonDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SeasonDetails);
