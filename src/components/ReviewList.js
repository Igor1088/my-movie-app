import React, { useState } from "react";
import Review from "./Review";

const ReviewList = ({ reviews = [], maxTextLength, maxNumOfReviews }) => {
  const [all, setView] = useState(false);

  if (reviews.length === 0) {
    return (
      <div className="review">
        <div className="review_list">
          <div>No Reviews</div>
        </div>
      </div>
    );
  }

  if (reviews.length <= maxNumOfReviews) {
    return (
      <div className="review">
        <div className="review--toggle">
          <button>Reviews({reviews.length})</button>
        </div>
        <div className="review__list">
          {reviews.map((i) => (
            <Review
              key={i.id}
              author={i.author}
              text={i.content}
              url={i.url}
              maxTextLength={maxTextLength}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="review">
      <div className="review--toggle">
        <button onClick={() => setView(!all)}>
          {all ? "Show Less" : `All Reviews(${reviews.length})`}
        </button>
      </div>
      <div className="review__list">
        {all
          ? reviews.map((i) => (
              <Review
                key={i.id}
                author={i.author}
                text={i.content}
                url={i.url}
                maxTextLength={maxTextLength}
              />
            ))
          : reviews
              .slice(0, maxNumOfReviews)
              .map((i) => (
                <Review
                  key={i.id}
                  author={i.author}
                  text={i.content}
                  url={i.url}
                  maxTextLength={maxTextLength}
                />
              ))}
      </div>
    </div>
  );
};

export default ReviewList;
