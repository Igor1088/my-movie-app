import React from "react";
import PropTypes from "prop-types";
import { dateFormat, timeFormat } from "../utils/helpers";
import Genres from "./Genres";
import MediaOptions from "./MediaOptions";
import MediaCrew from "./MediaCrew";

const MovieInfo = ({
  poster,
  tagline,
  overview,
  title,
  releaseDate,
  backdrop,
  genres = [],
  voteAverage,
  director = [],
  writers = [],
  createdBy = [],
  media,
  runtime,
  imdb,
  voteCount,
  handleFavoriteClick,
  isFavorite,
  handleWatchlistClick,
  inWatchlist,
  handleUserRating,
  accountStates,
  deleteRating,
  userLogged,
}) => {
  return (
    <div className="media__container">
      <div
        className="media__hero"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${backdrop})`,
        }}
      >
        <div className="media__poster">
          <figure>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster}`}
              className="media__poster-img"
              alt="poster"
            />
          </figure>
        </div>
        <div className="media__details">
          <h1 className="media__title">{title}</h1>
          <MediaOptions
            userLogged={userLogged}
            imdb={imdb}
            voteAverage={voteAverage}
            voteCount={voteCount}
            accountStates={accountStates}
            handleUserRating={handleUserRating}
            deleteRating={deleteRating}
            isFavorite={isFavorite}
            handleFavoriteClick={handleFavoriteClick}
            inWatchlist={inWatchlist}
            handleWatchlistClick={handleWatchlistClick}
          />
          <div className="media__info">
            <div className="media__info-holder">
              {media === "movie" ? (
                runtime ? (
                  <div className="media__runtime">{timeFormat(runtime)}</div>
                ) : null
              ) : null}
              {media === "tv" ? (
                runtime ? (
                  <div className="media__runtime">{`${runtime.join(
                    ", "
                  )} min.`}</div>
                ) : null
              ) : null}
              <div className="media__release-year">
                {releaseDate ? dateFormat(releaseDate) : "-"}
              </div>
            </div>
            <Genres list={genres} />
          </div>
          {tagline ? <p className="media__tagline">{tagline}</p> : null}
        </div>
      </div>
      <div className="media__desc">
        <div className="media__overview">
          <h4 className="media__overview-heading">Overview</h4>
          <p className="media__overview-text">{overview}</p>
        </div>
        <div className="media__crew">
          <div className="media__crew-row">
            <MediaCrew label="Director" list={director} showJob={false} />
          </div>
          <div className="media__crew-row">
            <MediaCrew label="Creator" list={createdBy} showJob={false} />
          </div>
          <div className="media__crew-row">
            <MediaCrew label="Writers" list={writers} showJob={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;

MovieInfo.propTypes = {
  title: PropTypes.string,
  tagline: PropTypes.string,
  overview: PropTypes.string,
  poster: PropTypes.string,
  release_date: PropTypes.string,
};
