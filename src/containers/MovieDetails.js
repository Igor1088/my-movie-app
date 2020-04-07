import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getMovieDetailsError,
  getMovieDetails,
  getMovieDetailsLoading,
} from "../reducers/movie-details";
import Loader from "../components/Loader";
import MediaInfo from "../components/MediaInfo";
import Person from "../components/Person";
import Item from "../components/Item";
import Image from "../components/Image";
import Video from "../components/Video";
import ReviewList from "../components/ReviewList";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";
import { groupByArray } from "../utils/helpers";

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
    // let crew = [];
    let similar = [];
    let director = [];
    let writers = [];

    if (movieDetails.length !== 0) {
      cast = movieDetails.credits.cast.slice(0, 14).map((person) => {
        return {
          name: person.name,
          role: person.character,
          poster: person.profile_path,
          personID: person.id,
        };
      });

      // crew = movieDetails.credits.crew.slice(0, 7).map(person => {
      //   return {
      //     name: person.name,
      //     role: person.job,
      //     poster: person.profile_path,
      //     personID: person.id
      //   };
      // });

      similar = movieDetails.similar.results.slice(0, 14).map((movie) => {
        return (
          <Item
            key={`${movie.id}-${movie.title}`}
            id={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            vote_average={movie.vote_average}
            media="movie"
            year={movie.release_date}
          />
        );
      });

      const featuredCrew = groupByArray(
        movieDetails.credits.crew,
        "department"
      );
      const foundDirector = featuredCrew.find((e) => e.key === "Directing");
      const foundWriters = featuredCrew.find((e) => e.key === "Writing");

      if (foundDirector) {
        director.push(foundDirector.values.find((d) => d.job === "Director"));
      }

      if (foundWriters) {
        writers.push(...foundWriters.values);
      }
    }

    return (
      <main>
        <MediaInfo
          title={movieDetails.title}
          poster={movieDetails.poster_path}
          overview={movieDetails.overview}
          tagline={movieDetails.tagline}
          releaseDate={movieDetails.release_date}
          backdrop={movieDetails.backdrop_path}
          genres={movieDetails.genres}
          voteAverage={movieDetails.vote_average}
          voteCount={movieDetails.vote_count}
          director={director}
          writers={writers}
          imdb={movieDetails.imdb_id}
          media="movie"
          runtime={movieDetails.runtime}
        />
        <div className="main">
          <Sidebar
            // heading="Facts"
            media="movie"
            status={movieDetails.status}
            release_date={movieDetails.release_date}
            originalLanguage={movieDetails.original_language}
            runtime={movieDetails.runtime}
            budget={movieDetails.budget}
            revenue={movieDetails.revenue}
            production={movieDetails.production_companies}
            homepage={movieDetails.homepage}
            imdb={movieDetails.imdb_id}
          />
          <div className="main__content">
            <Section heading="Featured Cast">
              <div className="person__list">
                {cast.map((person) => {
                  return (
                    <Person
                      key={`${person.personID}-${person.name}`}
                      id={person.personID}
                      name={person.name}
                      role={person.role}
                      poster={person.poster}
                    />
                  );
                })}
              </div>
            </Section>

            {/* <h4>Featured Crew</h4>
            <div className="person__list">
              {crew.map(person => {
                return (
                  <Person
                    key={`${person.personID}-${person.name}`}
                    id={person.personID}
                    name={person.name}
                    role={person.role}
                    poster={person.poster}
                  />
                );
              })}
            </div> */}

            <Section heading="Trailers">
              <div>
                {movieDetails.videos ? (
                  <Video videos={movieDetails.videos} />
                ) : (
                  <p>No Trailers</p>
                )}
              </div>
            </Section>

            {/* <h4>Images</h4>
                        <div className="photo__container">
                            {movieDetails.images.map( (img) => {
                                return(
                                <Image key={img.backdrop} size="w780" poster={img.backdrop}  specClass="photo"/>
                                );
                            })}
                        </div> */}

            {similar.length ? (
              <Section heading="More Like This">
                <div className="grid">{similar}</div>
              </Section>
            ) : null}

            <Section heading="Reviews">
              <ReviewList reviews={movieDetails.reviews} />
            </Section>
          </div>
        </div>
      </main>
    );
  }
}

MovieDetails.defaultProps = {
  movieDetails: [],
};

MovieDetails.propTypes = {
  movieDetails: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  error: getMovieDetailsError(state),
  loading: getMovieDetailsLoading(state),
  movieDetails: getMovieDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovieDetails: bindActionCreators(actions.fetchMovieDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
