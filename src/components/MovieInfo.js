import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieInfo = props => {
  const {
    poster,
    tagline,
    overview,
    title,
    release_date,
    backdrop,
    genres = [],
    vote_average,
    director,
    writers
  } = props;

  const year = release_date ? `(${release_date.slice(0, 4)})` : "";

  // const style = {
  //   'background-image': `url(https://image.tmdb.org/t/p/original${backdrop})`
  // }

  return (
    <div className="movie__container">
      {/* <div className="movie__backdrop" style={style}></div> */}
      <div className="movie__info">
        <div className="movie__image-holder">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            className="movie__image"
            alt="poster"
          />
        </div>
        <div className="movie__overview-holder">
          <h1>
            {title} <span>{year}</span>
          </h1>
          <div className="movie__overview-info">
            <div className="movie__vote">
              <ion-icon name="star"></ion-icon> {vote_average}
            </div>
            <div className="movie__genres">
              {genres.map(g => {
                return (
                  <div key={g.id} className="movie__genres-item">
                    {g.name}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="movie__tagline">{tagline}</p>
          <div className="movie__overview">
            <h4 className="movie__overview-heading">Overview</h4>
            <p className="movie__overview-text">{overview}</p>
            <div className="movie__overview-crew">
              <div className="movie__overview-crew-row">
                {director.length ? (
                  <Fragment>
                    <span className="movie__overview-crew-label">
                      Director:
                    </span>
                    <Link className="movie__overview-crew-link">
                      <Link to={`/person/${director[0].id}`}>
                        {director[0].name}
                      </Link>
                    </Link>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
              <div className="movie__overview-crew-row">
                {writers.length ? (
                  <Fragment>
                    <span className="movie__overview-crew-label">Writers:</span>
                    {writers.map(writer => (
                      <span
                        className="movie__overview-crew-link"
                        key={writer.id}
                      >
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
  release_date: PropTypes.string
};
