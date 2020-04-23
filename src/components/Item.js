import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Item = (props) => {
  const { poster, vote_average, title, id, media, year } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w154/${poster}`
    : placeholder;

  return (
    <div className="item">
      <Link to={`/${media}/${id}`}>
        <div className="item__image-holder">
          {/* <figure> */}
          <img src={path} className="item__image" alt="poster" />
          {/* <figcaption>Item caption</figcaption> */}
          {/* </figure> */}
          {vote_average ? (
            <div className="item__vote-average">
              <FaStar />
              <span>{vote_average}</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="item__info-holder">
          <p className="item__title">{title}</p>
          <p className="item__year">({year ? year.slice(0, 4) : year})</p>
        </div>
      </Link>
    </div>
  );
};

export default Item;

Item.propTypes = {
  title: PropTypes.string,
  poster: PropTypes.string,
  vote_average: PropTypes.number,
};
