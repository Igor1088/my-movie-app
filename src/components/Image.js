import React from "react";
import PropTypes from "prop-types";

const Image = ({ size, path, handleClick }) => (
  <figure
    className="gallery__item"
    onClick={() => handleClick({ open: true, link: path })}
  >
    <img
      className="gallery__img"
      src={`https://image.tmdb.org/t/p/w${size}${path}`}
      alt="backdrop"
    />
  </figure>
);

export default Image;

Image.propTypes = {
  size: PropTypes.string,
  poster: PropTypes.string,
};
