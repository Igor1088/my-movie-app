import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ item, media }) => {
  return (
    <div className="list__item">
      <div className="list__item-img">
        <Link to={`/${media}/${item.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt="poster"
          />
        </Link>
      </div>
      <div className="list__item-details">
        <div className="list__item-heading">
          <Link to={`/${media}/${item.id}`}>
            {item.title ? item.title : item.name}
          </Link>
        </div>
        <div className="list__item-overview">{item.overview}</div>
        {item.rating ? (
          <div className="list__item-rating">Your Rating: {item.rating}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ListItem;
