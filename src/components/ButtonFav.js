import React from "react";
import { FaHeart } from "react-icons/fa";

const ButtonFav = ({ userLogged, isFavorite, handleFavoriteClick }) => {
  if (!userLogged) {
    return (
      <div
        className="media__options-btn"
        title="Login to add to your favorite list"
      >
        <FaHeart />
      </div>
    );
  }

  return isFavorite ? (
    <div
      className="media__options-btn favorite"
      onClick={() => handleFavoriteClick(!isFavorite)}
      title="Remove from your favorite list"
    >
      <FaHeart />
    </div>
  ) : (
    <div
      className="media__options-btn"
      onClick={() => handleFavoriteClick(!isFavorite)}
      title="Mark as favorite"
    >
      <FaHeart />
    </div>
  );
};
export default ButtonFav;
