import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CreditsList = (props) => {
  const { credits, media, heading } = props;

  //   let list = credits ? credits : [];
  let creditsList;

  if (credits.length !== 0) {
    creditsList = credits
      .sort((a, b) =>
        b.release_date && a.release_date
          ? b.release_date.slice(0, 4) - a.release_date.slice(0, 4)
          : ""
      )
      .map((credit) => {
        return (
          <div key={credit.id} className="credits__item">
            <span className="credits__item-year">
              {credit.release_date ? credit.release_date.slice(0, 4) : ""}{" "}
              {credit.first_air_date ? credit.first_air_date.slice(0, 4) : ""}{" "}
            </span>
            <Link to={`/${media}/${credit.id}`}>
              {credit.title}
              {credit.name}
            </Link>{" "}
            - <span>{credit.character || credit.job}</span>
          </div>
        );
      });
  }

  return (
    <Fragment>
      {credits.length !== 0 ? (
        <div className="credits__list">
          <div>
            <h4>{heading}</h4>
            {creditsList}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default CreditsList;

CreditsList.propTypes = {
  movie_credits: PropTypes.object,
  tv_credits: PropTypes.object,
};
