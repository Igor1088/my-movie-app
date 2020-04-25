import React from "react";
import RatingContainer from "./RatingContainer";
import ButtonFav from "./ButtonFav";
import ButtonWatch from "./ButtonWatch";
import IconImdb from "./IconImdb";

const MediaOptions = ({
  userLogged,
  imdb,
  voteAverage,
  voteCount,
  accountStates,
  handleUserRating,
  deleteRating,
  isFavorite,
  handleFavoriteClick,
  inWatchlist,
  handleWatchlistClick,
}) => (
  <div className="media__options">
    <div>
      <IconImdb title="title" link={imdb} />
    </div>
    <div className="media__vote">
      <RatingContainer
        userLogged={userLogged}
        voteAverage={voteAverage}
        voteCount={voteCount}
        accountStates={accountStates}
        handleUserRating={handleUserRating}
        deleteRating={deleteRating}
      />
    </div>
    <ButtonFav
      userLogged={userLogged}
      isFavorite={isFavorite}
      handleFavoriteClick={handleFavoriteClick}
    />
    <ButtonWatch
      userrLogged={userLogged}
      inWatchlist={inWatchlist}
      handleWatchlistClick={handleWatchlistClick}
    />
  </div>
);

export default MediaOptions;
