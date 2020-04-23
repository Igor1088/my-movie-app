import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getTvShowDetailsError,
  getTvShowDetails,
  getTvShowDetailsLoading,
} from "../reducers/tvshow-details";
import { getUserLists } from "../reducers/userData";
import { getAccountStates } from "../reducers/account-states";
import { isEmpty } from "lodash";
import Loader from "../components/Loader";
import MediaInfo from "../components/MediaInfo";
import Person from "../components/Person";
import Item from "../components/Item";
import Season from "../components/Season";
import Video from "../components/Video";
import Section from "../components/Section";
import Sidebar from "../components/Sidebar";
import ReviewList from "../components/ReviewList";
import ImageGallery from "../components/ImageGallery";

class TvShowDetails extends Component {
  componentDidMount() {
    this.props.fetchTvShowDetails(this.props.match.params.id);
    this.props.fetchAccountStates(this.props.match.params.id, "tv");
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.match.params.id;
    let newId = this.props.match.params.id;
    if (newId !== oldId) {
      this.props.fetchTvShowDetails(this.props.match.params.id);
      this.props.fetchAccountStates(this.props.match.params.id, "tv");
    }

    console.log(prevProps);
    console.log("props", this.props);
  }

  handleFavoriteClick = (like) => {
    this.props.userListAction(
      this.props.match.params.id,
      "favorite",
      "tv",
      like
    );
  };

  handleWatchlistClick = (like) => {
    this.props.userListAction(
      this.props.match.params.id,
      "watchlist",
      "tv",
      like
    );
  };

  handleUserRating = (rating) => {
    this.props.userRateAction(this.props.match.params.id, "tv", rating);
  };

  handleDeleteRating = () => {
    this.props.deleteRating(this.props.match.params.id, "tv");
  };

  render() {
    const {
      error,
      loading,
      tvShowDetails,
      userLists,
      accountStates,
    } = this.props;
    const videos = tvShowDetails.videos ? tvShowDetails.videos.results : [];
    const inWatchlist = accountStates.watchlist;
    const isFavorite = accountStates.favorite;
    let cast = [];
    let images, items, seasons, reviews;

    if (error) {
      return <div>Error!</div>;
    }

    if (loading) {
      return <Loader />;
    }

    // const favoritesTV = isEmpty(userLists.favorite.tv)
    //   ? []
    //   : userLists.favorite.tv.results;

    // const isFavorite = favoritesTV.some(
    //   (i) => i.id === Number(this.props.match.params.id)
    // );

    // const watchlistTV = isEmpty(userLists.watchlist.tv)
    //   ? []
    //   : userLists.watchlist.tv.results;

    // const inWatchlist = watchlistTV.some(
    //   (i) => i.id === Number(this.props.match.params.id)
    // );

    if (tvShowDetails.length !== 0) {
      images = tvShowDetails.images.backdrops;
      reviews = tvShowDetails.reviews.results;
      cast = tvShowDetails.credits.cast.slice(0, 16).map((person) => {
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
        <MediaInfo
          title={tvShowDetails.name}
          poster={tvShowDetails.poster_path}
          overview={tvShowDetails.overview}
          tagline={tvShowDetails.tagline}
          backdrop={tvShowDetails.backdrop_path}
          genres={tvShowDetails.genres}
          voteAverage={tvShowDetails.vote_average}
          voteCount={tvShowDetails.vote_count}
          media="tv"
          runtime={tvShowDetails.episode_run_time}
          releaseDate={tvShowDetails.first_air_date}
          createdBy={tvShowDetails.created_by}
          imdb={
            tvShowDetails.external_ids && tvShowDetails.external_ids.imdb_id
          }
          handleFavoriteClick={this.handleFavoriteClick}
          isFavorite={isFavorite}
          inWatchlist={inWatchlist}
          handleWatchlistClick={this.handleWatchlistClick}
          handleUserRating={this.handleUserRating}
          accountStates={accountStates}
          deleteRating={this.handleDeleteRating}
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
              <div className="grid people">
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

            <Section heading="Photos">
              <ImageGallery
                images={images}
                previewNumber={6}
                previewWidth="300"
                fullWidth="780"
              />
            </Section>

            <Section heading="Trailers">
              <div>
                {videos.length > 0 ? (
                  <Video videos={videos} />
                ) : (
                  <p>No Trailers</p>
                )}
              </div>
            </Section>

            <Section heading="More Like This">
              <div className="grid">{items}</div>
            </Section>

            <Section heading="Reviews">
              <ReviewList
                reviews={reviews}
                maxTextLength={500}
                maxNumOfReviews={2}
              />
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
  userLists: getUserLists(state),
  accountStates: getAccountStates(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTvShowDetails: bindActionCreators(actions.fetchTvShowDetails, dispatch),
  userListAction: bindActionCreators(actions.userListAction, dispatch),
  fetchUserData: bindActionCreators(actions.fetchUserData, dispatch),
  userRateAction: bindActionCreators(actions.userRateAction, dispatch),
  fetchAccountStates: bindActionCreators(actions.fetchAccountStates, dispatch),
  deleteRating: bindActionCreators(actions.deleteRating, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TvShowDetails);
