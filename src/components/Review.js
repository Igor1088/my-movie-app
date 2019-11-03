import React from "react";

const Review = ({ author, content }) => (
  <div className="review__item">
    <div className="review__author">{author}</div>
    <div className="review__content">{content}</div>
  </div>
);

export default Review;
