import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getSeasonDetailsError,
  getSeasonDetails,
  getSeasonDetailsLoading,
} from "../reducers/tv-season";
import tvshowDetails, { getTvShowDetails } from "../reducers/tvshow-details";
import { FaArrowCircleLeft } from "react-icons/fa";
import Loader from "../components/Loader";
import Episode from "../components/Episode";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import CastList from "../components/CastList";
// import VideoList from "../components/VideoList";

class SeasonDetails extends Component {
  componentDidMount() {
    this.props.fetchTvShowDetails(this.props.match.params.id);
    this.props.fetchSeasonDetails(
      this.props.match.params.id,
      this.props.match.params.seasonNumber
    );
  }

  componentDidUpdate(prevProps) {
    let oldSeason = prevProps.match.params.seasonNumber;
    let newSeason = this.props.match.params.seasonNumber;
    if (newSeason !== oldSeason) {
      this.props.fetchTvShowDetails(this.props.match.params.id);
      this.props.fetchSeasonDetails(
        this.props.match.params.id,
        this.props.match.params.seasonNumber
      );
    }
  }

  render() {
    const { error, loading, seasonDetails, tvShowDetails } = this.props;
    // const videos = seasonDetails.videos ? seasonDetails.videos.results : [];

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let items, episodesCount;

    if (seasonDetails.episodes) {
      items = seasonDetails.episodes.map((i) => (
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
          crew={i.crew}
          guestStars={i.guest_stars}
        />
      ));

      episodesCount = seasonDetails.episodes.length;
    }

    const seasonsNumber = tvShowDetails.number_of_seasons;

    const prev =
      seasonDetails.season_number - 1 > 0
        ? seasonDetails.season_number - 1
        : null;
    const next =
      seasonDetails.season_number + 1 <= seasonsNumber
        ? seasonDetails.season_number + 1
        : null;

    return (
      <div className="season">
        <Link className="season__back-link" to={`/tv/${tvShowDetails.id}`}>
          <FaArrowCircleLeft />
          <span>Back to {tvshowDetails ? tvShowDetails.name : "Tv Show"}</span>
        </Link>
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
        <Section heading="Cast">
          <CastList
            list={seasonDetails.credits ? seasonDetails.credits.cast : []}
            message="No Cast"
          />
        </Section>
        {/* <Section heading="Trailers">
          <div>
            {videos.length > 0 ? <Video videos={videos} /> : <p>No Trailers</p>}
          </div>
        </Section> */}
        <div className="season__nav">
          <div>
            {prev ? (
              <Link to={`/tv/${this.props.match.params.id}/season/${prev}`}>
                <span>{`Season ${prev}`}</span>
              </Link>
            ) : (
              ""
            )}
          </div>
          <div>
            {next ? (
              <Link to={`/tv/${this.props.match.params.id}/season/${next}`}>
                <span>{`Season ${next}`}</span>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
        <Section>
          <div className="episode__list">
            <div className="episode__list-count">
              <strong>Episodes:</strong> {episodesCount}
            </div>
            {items}
          </div>
        </Section>
      </div>
    );
  }
}

SeasonDetails.defaultProps = {
  seasonDetails: [],
};

const mapStateToProps = (state) => ({
  error: getSeasonDetailsError(state),
  seasonDetails: getSeasonDetails(state),
  loading: getSeasonDetailsLoading(state),
  tvShowDetails: getTvShowDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSeasonDetails: bindActionCreators(actions.fetchSeasonDetails, dispatch),
  fetchTvShowDetails: bindActionCreators(actions.fetchTvShowDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SeasonDetails);
