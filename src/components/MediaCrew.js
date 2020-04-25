import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const MediaCrew = ({ label, list, showJob }) =>
  list.length ? (
    <Fragment>
      <span className="media__crew-label">{label}:</span>
      {list.map((i) => (
        <span className="media__crew-link" key={i.id}>
          <Link to={`/person/${i.id}`}>
            {`${i.name}`}
            {showJob ? <span>{` (${i.job})`}</span> : null}
          </Link>
        </span>
      ))}
    </Fragment>
  ) : null;

export default MediaCrew;
