import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import tvshowDetails, {
  getTvShowDetailsError,
  getTvShowDetails,
  getTvShowDetailsLoading,
} from "../reducers/tvshow-details";
import Loader from "../components/Loader";
import MediaInfo from "../components/MediaInfo";
import Person from "../components/Person";
import Item from "../components/Item";
import Season from "../components/Season";
import Image from "../components/Image";
import Video from "../components/Video";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";

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

    let cast = [];
    let items, seasons;

    if (tvShowDetails.length !== 0) {
      cast = tvShowDetails.credits.cast.slice(0, 14).map((person) => {
        return {
          name: person.name,
          role: person.character,
          poster: person.profile_path,
          personID: person.id,
        };
      });

      items = tvShowDetails.similar.results.slice(0, 14).map((tv) => {
        return (
          <Item
            key={tv.id}
            id={tv.id}
            poster={tv.poster_path}
            title={tv.name}
            vote_average={tv.vote_average}
            media="tv"
            year={tv.first_air_date}
          />
        );
      });

      seasons = tvShowDetails.seasons.map((s) => {
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
        {/* <MovieInfo
          title={tvShowDetails.name}
          poster={tvShowDetails.poster_path}
          overview={tvShowDetails.overview}
          tagline={tvShowDetails.tagline}
          backdrop={tvShowDetails.backdrop_path}
          genres={tvShowDetails.genres}
          vote_average={tvShowDetails.vote_average}
          director={[]}
          writers={[]}
        /> */}

        <MediaInfo
          title={tvShowDetails.name}
          poster={tvShowDetails.poster_path}
          overview={tvShowDetails.overview}
          tagline={tvShowDetails.tagline}
          backdrop={tvShowDetails.backdrop_path}
          genres={tvShowDetails.genres}
          voteAverage={tvShowDetails.vote_average}
          voteCount={tvShowDetails.vote_count}
          director={[]}
          writers={[]}
          media="tv"
          runtime={tvShowDetails.episode_run_time}
          releaseDate={tvShowDetails.first_air_date}
          createdBy={tvShowDetails.created_by}
        />
        <main className="main">
          <Sidebar
            // heading="Facts"
            media="tv"
            production={tvShowDetails.networks}
            runtime={tvShowDetails.episode_run_time}
            homepage={tvShowDetails.homepage}
            release_date={tvShowDetails.first_air_date}
            status={tvShowDetails.status}
            originalLanguage={tvShowDetails.original_language}
            originalName={tvShowDetails.original_name}
          />
          <div className="main__content">
            <Section heading="Featured Cast">
              <div className="person__list">
                {cast.map((person) => {
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
            </Section>

            <Section heading="Seasons">
              <div className="grid">{seasons}</div>
            </Section>

            <Section heading="Trailers">
              <div>
                <Video videos={tvShowDetails.videos} />
              </div>
            </Section>

            <Section heading="More Like This">
              <div className="grid">{items}</div>
            </Section>
          </div>
        </main>
      </div>
    );
  }
}

TvShowDetails.defaultProps = {
  tvShowDetails: [],
};

TvShowDetails.propTypes = {
  tvShowDetails: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  error: getTvShowDetailsError(state),
  loading: getTvShowDetailsLoading(state),
  tvShowDetails: getTvShowDetails(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTvShowDetails: bindActionCreators(actions.fetchTvShowDetails, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetails);
