import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import tvshowDetails, {
  getTvShowDetailsError,
  getTvShowDetails,
  getTvShowDetailsLoading
} from "../reducers/tvshow-details";
import Loader from "../components/Loader";
import MovieInfo from "../components/MovieInfo";
import TvData from "../components/TvData";
import Person from "../components/Person";
import Item from "../components/Item";
import Season from "../components/Season";
import Image from "../components/Image";
import Video from "../components/Video";

class TvShowDetails extends Component {
  componentDidMount() {
    this.props.fetchTvShowDetails(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId) {
      this.props.fetchTvShowDetails(this.props.match.params.id);
    }
  }

  render() {
    const { error, loading, tvShowDetails } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    console.log("tv details", this.props);

    let cast = [];
    let items, seasons;

    if (tvShowDetails.length !== 0) {
      cast = tvShowDetails.credits.cast.slice(0, 6).map(person => {
        return {
          name: person.name,
          role: person.character,
          poster: person.profile_path,
          personID: person.id
        };
      });

      items = tvShowDetails.similar.results.slice(0, 12).map(tv => {
        return (
          <Item
            key={tv.id}
            id={tv.id}
            poster={tv.poster_path}
            title={tv.name}
            vote_average={tv.vote_average}
            media="tv"
            hoverClass="item__hover"
          />
        );
      });

      seasons = tvShowDetails.seasons.map(s => {
        return (
          <Season
            key={s.id}
            id={s.id}
            poster={s.poster_path}
            title={s.name}
            episodes={s.episode_count}
            tvShowID={tvShowDetails.id}
            number={s.season_number}
          />
        );
      });
    }

    return (
      <div>
        <MovieInfo
          title={tvShowDetails.name}
          poster={tvShowDetails.poster_path}
          overview={tvShowDetails.overview}
          tagline={tvShowDetails.tagline}
          backdrop={tvShowDetails.backdrop_path}
          genres={tvShowDetails.genres}
          vote_average={tvShowDetails.vote_average}
        />
        <div className="movie__content">
          <div className="movie__sidebar">
            <h4>Facts</h4>
            <TvData
              production={tvShowDetails.networks}
              runtime={tvShowDetails.episode_run_time}
              homepage={tvShowDetails.homepage}
              release_date={tvShowDetails.first_air_date}
              status={tvShowDetails.status}
              language={tvShowDetails.original_language}
            />
          </div>
          <div className="movie__content-main">
            <h4>Featured Cast</h4>
            <div className="person__list">
              {cast.map(person => {
                return (
                  <Person
                    key={person.personID}
                    id={person.personID}
                    name={person.name}
                    role={person.role}
                    poster={person.poster}
                  />
                );
              })}
            </div>

            <h4>Seasons</h4>
            <div className="row">{seasons}</div>

            <h4>Trailers</h4>
            <div>
              <Video videos={tvShowDetails.videos} />
            </div>

            <h4>More Like This</h4>
            <div className="row">{items}</div>
          </div>
        </div>
      </div>
    );
  }
}

TvShowDetails.defaultProps = {
  tvShowDetails: []
};

TvShowDetails.propTypes = {
  tvShowDetails: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  error: getTvShowDetailsError(state),
  loading: getTvShowDetailsLoading(state),
  tvShowDetails: getTvShowDetails(state)
});

function mapDispatchToProps(dispatch) {
  return {
    fetchTvShowDetails: bindActionCreators(actions.fetchTvShowDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TvShowDetails);
