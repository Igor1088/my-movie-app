import React from "react";

import Review from "./Review";

const ReviewList = ({ reviews }) => (
  <div className="review__list">
    {(reviews ? (reviews.total_pages > 0 ? true : false) : false) ? (
      reviews.results.map((i) => (
        <Review key={i.id} author={i.author} content={i.content} url={i.url} />
      ))
    ) : (
      <div>No Reviews</div>
    )}
  </div>
);

export default ReviewList;
