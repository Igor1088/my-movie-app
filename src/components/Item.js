import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Item = (props) => {
  const { poster, vote_average, title, id, media, year, preview } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w342${poster}`
    : placeholder;

  return (
    <div className="item">
      <Link to={`/${media}/${id}`}>
        <div className="item__image-holder">
          <img src={path} className="item__image" alt="poster" />
          <div className="item__vote-average">
            {vote_average ? (
              <Fragment>
                <FaStar />
                <span>{vote_average}</span>
              </Fragment>
            ) : null}
          </div>
        </div>
        {!preview ? (
          <div className="item__info-holder">
            <p className="item__title">{title}</p>
            <p className="item__year">
              {year ? `(${year.slice(0, 4)})` : year}
            </p>
          </div>
        ) : null}
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
