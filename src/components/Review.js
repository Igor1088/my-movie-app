import React, { useState } from "react";

const Review = ({ author, content, url }) => {
  const [short, toggle] = useState(true);

  return (
    <div className="review__item">
      <div className="review__author">
        Written by <span>{author}</span>
      </div>
      <div className="review__link">
        <a href={`${url}`} target="__blank">
          Read a review on tmdb
        </a>
      </div>
      <div className="review__content">
        {content.length < 500 ? (
          content
        ) : short ? (
          <p className="review__content-short">
            {`${content.slice(0, 500)}...`}
            <button className="review__btn" onClick={() => toggle(!short)}>
              Read More
            </button>
          </p>
        ) : (
          <p className="review__content-long">
            {content}
            <button
              className="review__btn expanded"
              onClick={() => toggle(!short)}
            >
              Read less
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Review;
