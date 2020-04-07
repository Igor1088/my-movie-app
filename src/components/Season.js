import React from "react";
import { Link } from "react-router-dom";

const Season = (props) => {
  const { poster, title, tvShowID, episodes, number } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w154/${poster}`
    : placeholder;

  return (
    <div className="item">
      <Link to={`/tv/${tvShowID}/season/${number}`}>
        <div className="item__image-holder">
          <img src={path} className="item__image" alt="poster" />
        </div>
        <div className="item__info-holder">
          <p className="item__title">{title}</p>
          <p className="item__add-info">{episodes} Episodes</p>
        </div>
      </Link>
    </div>
  );
};

export default Season;
