import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getMovieDetailsError,
  getMovieDetails,
  getMovieDetailsLoading
} from "../reducers/movie-details";
import Loader from "../components/Loader";
import MovieInfo from "../components/MovieInfo";
import MovieData from "../components/MovieData";
import Person from "../components/Person";
import Item from "../components/Item";
import Image from "../components/Image";
import Video from "../components/Video";
import ReviewList from "../components/ReviewList";

class MovieDetails extends Component {
  componentDidMount() {
    this.props.fetchMovieDetails(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId) {
      this.props.fetchMovieDetails(this.props.match.params.id);
    }
    // ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    const { error, loading, movieDetails } = this.props;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    let cast = [];
    let crew = [];
    let items;

    if (movieDetails.length !== 0) {
      cast = movieDetails.credits.cast.slice(0, 6).map(person => {
        return {
          name: person.name,
          role: person.character,
          poster: person.profile_path,
          personID: person.id
        };
      });

      crew = movieDetails.credits.crew.slice(0, 6).map(person => {
        return {
          name: person.name,
          role: person.job,
          poster: person.profile_path,
          personID: person.id
        };
      });

      items = movieDetails.similar.results.slice(0, 12).map(movie => {
        return (
          <Item
            key={movie.id}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            media="movie"
          />
        );
      });
    }

    return (
      <div>
        <MovieInfo
          title={movieDetails.title}
          poster={movieDetails.poster_path}
          overview={movieDetails.overview}
          tagline={movieDetails.tagline}
          release_date={movieDetails.release_date}
          backdrop={movieDetails.backdrop_path}
          genres={movieDetails.genres}
          vote_average={movieDetails.vote_average}
        />
        <div className="movie__content">
          <div className="movie__sidebar">
            <h4>Facts</h4>
            <MovieData
              production={movieDetails.production_companies}
              runtime={movieDetails.runtime}
              budget={movieDetails.budget}
              revenue={movieDetails.revenue}
              release_date={movieDetails.release_date}
              imdb={movieDetails.imdb_id}
              status={movieDetails.status}
              homepage={movieDetails.homepage}
              // language={movieDetails.spoken_languages ? movieDetails.spoken_languages[0].name : ""}
              language={movieDetails.original_language}
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
              <Video videos={movieDetails.videos} />
            </div>

            {/* <h4>Images</h4>
                        <div className="photo__container">
                            {movieDetails.images.map( (img) => {
                                return(
                                <Image key={img.backdrop} size="w780" poster={img.backdrop}  specClass="photo"/>
                                );
                            })}
                        </div> */}

            <h4>More Like This</h4>
            <div className="row">{items}</div>
            {/* <ReviewList reviews={movieDetails.reviews} /> */}
          </div>
        </div>
      </div>
    );
  }
}

MovieDetails.defaultProps = {
  movieDetails: []
};

MovieDetails.propTypes = {
  movieDetails: PropTypes.array,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  error: getMovieDetailsError(state),
  loading: getMovieDetailsLoading(state),
  movieDetails: getMovieDetails(state)
});

function mapDispatchToProps(dispatch) {
  return {
    fetchMovieDetails: bindActionCreators(actions.fetchMovieDetails, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieDetails);
