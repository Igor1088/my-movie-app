import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Person = (props) => {
  const { id, name, role, poster } = props;
  const placeholder = "http://placehold.it/154x230";
  const path = poster
    ? `https://image.tmdb.org/t/p/w185/${poster}`
    : placeholder;

  return (
    <Link to={`/person/${id}`}>
      <div className="person__holder">
        <img className="person__img" src={path} alt="person" />
        <div className="person__info-text">
          <p className="person__name">{name}</p>
          <p className="person__role">{role}</p>
        </div>
      </div>
    </Link>
  );
};

export default Person;

Person.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  poster: PropTypes.string,
};
