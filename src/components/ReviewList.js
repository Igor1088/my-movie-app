import React from "react";
import Review from "./Review";

const ReviewList = ({ all, items = [], maxTextLength, maxNumOfReviews }) => {
  if (items.length === 0) {
    return (
      <div className="review">
        <div className="review_list">
          <div>No Reviews</div>
        </div>
      </div>
    );
  }

  return (
    <div className="review">
      <div className="review__list">
        {all
          ? items.map((i) => (
              <Review
                key={i.id}
                author={i.author}
                text={i.content}
                url={i.url}
                maxTextLength={maxTextLength}
              />
            ))
          : items
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
