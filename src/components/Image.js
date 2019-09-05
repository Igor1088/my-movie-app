import React from 'react';
import PropTypes from 'prop-types';

const Image = ({size, poster}) => {
  return (
      <img className="" src={`https://image.tmdb.org/t/p/${size}/${poster}`} alt="poster" />
  );
}

export default Image;

Image.propTypes =  {
    size: PropTypes.string,
    poster: PropTypes.string
}

