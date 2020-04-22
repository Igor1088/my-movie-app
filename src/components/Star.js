import React from "react";

import { FaStar, FaRegStar } from "react-icons/fa";

const Star = (props) => (
  <span
    className="rating__star"
    onClick={props.handleClick}
    onMouseEnter={props.handleMouseOver}
    onMouseLeave={props.handleMouseOut}
  >
    {props.selected || props.rating ? <FaStar /> : <FaRegStar />}
  </span>
);

export default Star;
