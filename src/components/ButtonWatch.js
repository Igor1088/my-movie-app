import React from "react";
import { FaBookmark } from "react-icons/fa";

const ButtonWatch = ({
  userrLogged,
  inWatchlist,
  handleWatchlistClick,
  itemid,
}) => {
  if (!userrLogged) {
    return (
      <div
        className="media__options-btn"
        title="Login to add to your watchlist"
      >
        <FaBookmark />
      </div>
    );
  }

  return inWatchlist ? (
    <div
      className="media__options-btn watchlist"
      onClick={() => handleWatchlistClick(!inWatchlist, itemid)}
      title="Remove from your watchlist"
    >
      <FaBookmark />
    </div>
  ) : (
    <div
      className="media__options-btn"
      onClick={() => handleWatchlistClick(!inWatchlist, itemid)}
      title="Add to your watchlist"
    >
      <FaBookmark />
    </div>
  );
};

export default ButtonWatch;
