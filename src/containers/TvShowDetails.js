import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getTvShowDetailsError,
  getTvShowDetails,
  getTvShowDetailsLoading
} from "../reducers/tvshow-details";
import Loader from "../components/Loader";
import MovieInfo from "../components/MovieInfo";
import MovieData from "../components/MovieData";
import Person from "../components/Person";
import Item from "../components/Item";
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

    console.log("details", this.props);

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let cast = [];
    let crew = [];
    let items;

    if (tvShowDetails.length !== 0) {
      cast = tvShowDetails.credits.cast.slice(0, 6).map(person => {
        return {
          name: person.name,
          role: person.character,
          poster: person.profile_path,
          personID: person.id
        };
      });

      crew = tvShowDetails.credits.crew.slice(0, 6).map(person => {
        return {
          name: person.name,
          role: person.job,
          poster: person.profile_path,
          personID: person.id
        };
      });

      items = tvShowDetails.similar.results.slice(0, 12).map(movie => {
        return (
          <Item
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            media="tv"
          />
        );
      });
    }

    return (
      <div>
        <MovieInfo
          title={tvShowDetails.title}
          poster={tvShowDetails.poster_path}
          overview={tvShowDetails.overview}
          tagline={tvShowDetails.tagline}
          release_date={tvShowDetails.release_date}
          backdrop={tvShowDetails.backdrop_path}
          genres={tvShowDetails.genres}
          vote_average={tvShowDetails.vote_average}
        />
        <div className="movie__content">
          <div className="movie__sidebar">
            <h4>Movie Data</h4>
            {/* <MovieData
              production={tvShowDetails.production_companies}
              runtime={tvShowDetails.runtime}
              budget={tvShowDetails.budget}
              release_date={tvShowDetails.first_air_date}
              imdb={tvShowDetails.imdb_id}
              status={tvShowDetails.status}
              homepage={tvShowDetails.homepage}
              language={tvShowDetails.original_language}
            /> */}
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

            <h4>Featured Crew</h4>
            <div className="person__list">
              {crew.map(person => {
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
  tvShowDetails: getTvShowDetails(state),
  loading: getTvShowDetailsLoading(state)
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
