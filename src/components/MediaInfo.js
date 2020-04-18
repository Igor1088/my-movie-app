import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { dateFormat, timeFormat } from "../utils/helpers";
import { ReactComponent as StarIcon } from "../img/star.svg";
import { ReactComponent as ImdbLogo } from "../img/imdb.svg";

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
  handleFav,
  isFavorite,
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
            {/* {media === "movie" ? ( */}
            <div>
              <a
                href={`http://www.imdb.com/title/${imdb}`}
                target="_blank"
                rel="noopener noreferrer"
                title="imdb"
              >
                <i className="icon-imdb">
                  <ImdbLogo />
                </i>
              </a>
            </div>
            {/* ) : null} */}
            <div className="media__vote">
              <i className="icon-star">
                <StarIcon />
              </i>
              <div>
                <div>{voteAverage} / 10</div>
                <small>({voteCount})</small>
              </div>
            </div>
            <div>
              {media === "movie" ? (runtime ? timeFormat(runtime) : "-") : null}
              {media === "tv"
                ? runtime
                  ? `${runtime.join(", ")} min.`
                  : "-"
                : null}
            </div>
            <div className="media__release-year">
              {releaseDate ? dateFormat(releaseDate) : "-"}
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
          <p className="media__tagline">{tagline}</p>
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
        <div className="media__list">
          <div
            className="media__list-btn"
            onClick={() => handleFav(!isFavorite)}
          >
            {isFavorite ? "Remove a favorite" : "Add a favorite"}
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
