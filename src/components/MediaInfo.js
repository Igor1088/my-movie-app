import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { dateFormat, timeFormat } from "../utils/helpers";
import { isEmpty } from "lodash";
import { FaHeart, FaBookmark, FaImdb, FaStar } from "react-icons/fa";

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
  media,
  runtime,
  imdb,
  createdBy,
  voteCount,
  handleFavoriteClick,
  isFavorite,
  handleWatchlistClick,
  inWatchlist,
  handleUserRating,
  accountStates,
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
          <div className="media__options">
            <div>
              <a
                href={`http://www.imdb.com/title/${imdb}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Go to Imdb"
              >
                <i className="icon-imdb">
                  <FaImdb />
                </i>
              </a>
            </div>
            <div className="media__vote">
              <i className="icon-star">
                <FaStar />
              </i>
              <div>
                <div>{voteAverage} / 10</div>
                <small>({voteCount})</small>
              </div>
              <div className="rating__container">
                <Rating
                  totalStars={10}
                  currentRating={
                    !isEmpty(accountStates) ? accountStates.rated.value : 0
                  }
                  handleUserRating={handleUserRating}
                />
              </div>
            </div>
            {isFavorite ? (
              <div
                className="media__options-btn favorite"
                onClick={() => handleFavoriteClick(!isFavorite)}
                title="Remove from your favorite list"
              >
                <FaHeart />
              </div>
            ) : (
              <div
                className="media__options-btn"
                onClick={() => handleFavoriteClick(!isFavorite)}
                title="Mark as favorite"
              >
                <FaHeart />
              </div>
            )}
            {inWatchlist ? (
              <div
                className="media__options-btn watchlist"
                onClick={() => handleWatchlistClick(!inWatchlist)}
                title="Remove from your watchlist"
              >
                <FaBookmark />
              </div>
            ) : (
              <div
                className="media__options-btn"
                onClick={() => handleWatchlistClick(!inWatchlist)}
                title="Add to your watchlist"
              >
                <FaBookmark />
              </div>
            )}
          </div>
          <div className="media__info">
            <div className="media__info-holder">
              <div className="media__runtime">
                {media === "movie"
                  ? runtime
                    ? timeFormat(runtime)
                    : "-"
                  : null}
                {media === "tv"
                  ? runtime
                    ? `${runtime.join(", ")} min.`
                    : "-"
                  : null}
              </div>
              <div className="media__release-year">
                {releaseDate ? dateFormat(releaseDate) : "-"}
              </div>
            </div>
            <div className="media__genres">
              {genres.map((g) => {
                return (
                  <div key={g.id} className="media__genres-item">
                    {g.name}
                  </div>
                );
              })}
            </div>
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
            {director.length ? (
              <Fragment>
                <span className="media__crew-label">Director:</span>
                <span className="media__crew-link">
                  <Link to={`/person/${director[0].id}`}>
                    {director[0].name}
                  </Link>
                </span>
              </Fragment>
            ) : (
              ""
            )}
            {createdBy ? (
              <Fragment>
                <span className="media__crew-label">Creator:</span>
                {createdBy.map((i) => {
                  return (
                    <Fragment>
                      <span className="media__crew-link">
                        <Link to={`/person/${i.id}`}>{i.name}</Link>
                      </span>
                    </Fragment>
                  );
                })}
              </Fragment>
            ) : null}
          </div>
          <div className="media__crew-row">
            {writers.length ? (
              <Fragment>
                <span className="media__crew-label">Writers:</span>
                {writers.map((writer) => (
                  <span className="media__crew-link" key={writer.id}>
                    <Link
                      to={`/person/${writer.id}`}
                    >{`${writer.name} (${writer.job})`}</Link>
                  </span>
                ))}
              </Fragment>
            ) : (
              ""
            )}
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
