import React from "react";

const Episode = props => {
  const {
    poster,
    voteAverage,
    voteCount,
    name,
    overview,
    seasonNumber,
    episodeNumber,
    airDate
  } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w154/${poster}`
    : placeholder;

  return (
    <div className="episode">
      <div className="episode__img-holder">
        <img src={path} className="episode__image" alt="poster" />
        <div className="episode__number">
          S{seasonNumber < 10 ? "0" + seasonNumber : seasonNumber}, Ep
          {episodeNumber < 10 ? "0" + episodeNumber : episodeNumber}
        </div>
      </div>
      <div className="episode__details">
        <div className="episode__heading">
          <h4 className="episode__name">{name}</h4>
          <div className="episode__date">{airDate}</div>
        </div>
        <div className="episode__info">
          <span className="episode__vote">
            <ion-icon name="star"></ion-icon>
          </span>{" "}
          {voteAverage.toFixed(1)} ({voteCount})
        </div>
        <div className="episode__overview">{overview}</div>
      </div>
    </div>
  );
};

export default Episode;
