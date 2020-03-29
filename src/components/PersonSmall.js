import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PersonSmall = props => {
  const { id, name, role, poster } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w185/${poster}`
    : placeholder;

  return (
    <Link to={`/person/${id}`}>
      <div className="person-small__holder">
        <img className="person-small__img" src={path} alt="person" />
        <div className="person-small__details">
          <p className="person-small__name">
            <strong>{name}</strong>
          </p>
          <p className="person-small__role">{role}</p>
        </div>
      </div>
    </Link>
  );
};

export default PersonSmall;

PersonSmall.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  poster: PropTypes.string
};
