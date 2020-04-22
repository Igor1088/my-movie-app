import React, { useState, useEffect } from "react";
import Star from "./Star";
import PropTypes from "prop-types";

const Rating = ({ totalStars, currentRating, handleUserRating }) => {
  const [rating, setRating] = useState(currentRating);
  const [selectedStars, setSelectedStars] = useState(0);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  let starsArray = [];

  const handleRating = (i) => {
    setRating(i + 1);
    handleUserRating(i + 1);
  };

  for (let i = 0; i < totalStars; i++) {
    starsArray.push(
      <Star
        key={i}
        selected={i < selectedStars ? true : null}
        rating={i < rating ? true : null}
        handleClick={() => handleRating(i)}
        handleMouseOver={() => setSelectedStars(i + 1)}
        handleMouseOut={() => setSelectedStars(0)}
      />
    );
  }

  return <div className="rating">{starsArray}</div>;
};

Rating.defaultProps = {
  totalStars: 5,
  currentRating: 0,
};

Rating.propTypes = {
  totalStars: PropTypes.number,
  currentRating: PropTypes.number,
};

export default Rating;
