import React, { Fragment } from "react";
import { isEmpty } from "lodash";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import Rating from "./Rating";

const RatingContainer = ({
  userLogged,
  voteAverage,
  voteCount,
  accountStates,
  handleUserRating,
  deleteRating,
}) => {
  if (!userLogged) {
    return (
      <i className="icon-star" title="Login to rate">
        <FaStar />
      </i>
    );
  }
  return (
    <Fragment>
      <i className="icon-star">
        <FaStar />
      </i>
      <div>
        <div>{voteAverage} / 10</div>
        <small>({voteCount})</small>
      </div>
      <div className="rating__container">
        <i className="icon-remove" title="Delete Rating" onClick={deleteRating}>
          <IoIosRemoveCircleOutline />
        </i>
        <Rating
          totalStars={10}
          currentRating={
            !isEmpty(accountStates) ? accountStates.rated.value : 0
          }
          handleUserRating={handleUserRating}
        />
      </div>
    </Fragment>
  );
};

export default RatingContainer;
