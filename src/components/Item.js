import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Item = props => {
  const { poster, vote_average, title, id, media, hoverClass } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w154/${poster}`
    : placeholder;

  const itemClass = hoverClass ? `item ${hoverClass}` : "item";
  return (
    <div className={itemClass}>
      <Link to={`/${media}/${id}`}>
        <div className="item__image-holder">
          <img src={path} className="item__image" alt="poster" />
          <div className="item__vote-average">
            <ion-icon name="star"></ion-icon>
            <span>{vote_average}</span>
          </div>
        </div>
        <div className="item__info-holder">
          <p className="item__title">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default Item;

Item.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  vote_average: PropTypes.number
};
