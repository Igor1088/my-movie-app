import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Review = ({ author, text, url, maxTextLength }) => {
  const [short, setText] = useState(true);

  if (text.length <= maxTextLength) {
    return (
      <div className="review__item">
        <div className="review__author">
          Review by <span>{author}</span>
        </div>
        <a href={`${url}`} target="__blank" className="review__link">
          <span>Read on tmdb</span> <FaExternalLinkAlt />
        </a>
        <div className="review__text">{text}</div>
      </div>
    );
  }

  return (
    <div className="review__item">
      <div className="review__author">
        <em>Review by</em> <span>{author}</span>
      </div>
      <a href={`${url}`} target="__blank" className="review__link">
        <span>Read on tmdb</span> <FaExternalLinkAlt />
      </a>
      <div className="review__text">
        {short ? (
          <p>
            {`${text.substr(0, maxTextLength).trim()}...`}
            <button className="review__btn" onClick={() => setText(!short)}>
              Read More
            </button>
          </p>
        ) : (
          <p>
            {text}
            <button
              className="review__btn expanded"
              onClick={() => setText(!short)}
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
