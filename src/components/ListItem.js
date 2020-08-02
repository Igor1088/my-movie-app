import React from "react";
import { Link } from "react-router-dom";
import ButtonFav from "./ButtonFav";
import ButtonWatch from "./ButtonWatch";
import RatingContainer from "./RatingContainer";

const ListItem = ({
  item,
  media,
  favorites = [],
  watchlist = [],
  ratedList = [],
  handleFavoriteClick,
  handleWatchlistClick,
}) => {
  const isFavorite = favorites.some((i) => i.id === item.id);
  const inWatchlist = watchlist.some((i) => i.id === item.id);
  const rated = ratedList.find((i) => i.id === item.id);
  const rating = item.rating || (rated && rated.rating);

  return (
    <div className="list__item">
      <div className="list__item-img">
        <Link to={`/${media}/${item.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
            alt="poster"
          />
        </Link>
      </div>
      <div className="list__item-details">
        <div className="list__item-heading">
          <Link to={`/${media}/${item.id}`}>
            {item.title ? item.title : item.name}
          </Link>
        </div>
        <div className="list__item-overview">{item.overview}</div>
        <div className="list__item-options">
          <div className="list__item-options-item">
            <ButtonFav
              userLogged={true}
              isFavorite={isFavorite}
              handleFavoriteClick={handleFavoriteClick}
              itemid={item.id}
            />
            <span className="list__item-options-label">Favorite</span>
          </div>
          <div className="list__item-options-item">
            <ButtonWatch
              userrLogged={true}
              inWatchlist={inWatchlist}
              handleWatchlistClick={handleWatchlistClick}
              itemid={item.id}
            />
            <span className="list__item-options-label">Watchlist</span>
          </div>
          <div className="list__item-options-item">
            {rating ? (
              <React.Fragment>
                <div className="list__item-rating">{rating}</div>
                <span className="list__item-options-label">Your Rating</span>
              </React.Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
