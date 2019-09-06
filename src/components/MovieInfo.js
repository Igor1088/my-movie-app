import React from "react";
import PropTypes from "prop-types";

const MovieInfo = props => {
  const {
    poster,
    tagline,
    overview,
    title,
    release_date,
    backdrop,
    genres = [],
    vote_average
  } = props;
  const year = release_date ? release_date.slice(0, 4) : "";

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
            {title} <span>({year})</span>
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
            <p>{overview}</p>
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
