import React from "react";

import Review from "./Review";

const ReviewList = ({ reviews }) => (
  <div className="review__list">
    {reviews &&
      reviews.results.map(i => (
        <Review key={i.id} author={i.author} content={i.content} />
      ))}
  </div>
);

export default ReviewList;
