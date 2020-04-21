import React, { Fragment } from "react";
import PersonSmall from "./PersonSmall";

const CastList = ({ list, message }) => (
  <Fragment>
    {list.length > 0 ? (
      <ul className="cast__list">
        {list.map((i) => (
          <li className="cast__item">
            <PersonSmall
              key={i.id}
              id={i.id}
              name={i.name}
              role={i.character}
              poster={i.profile_path}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p>{message}</p>
    )}
  </Fragment>
);

export default CastList;
