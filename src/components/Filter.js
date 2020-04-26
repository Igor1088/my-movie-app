import React from "react";

const Filter = ({ filter, handleFilterClick }) => (
  <div className="row__filter">
    <div
      className={`row__filter-item ${filter === "day" ? "active" : ""}`}
      onClick={handleFilterClick}
    >
      Day
    </div>
    <div
      className={`row__filter-item ${filter === "week" ? "active" : ""}`}
      onClick={handleFilterClick}
    >
      Week
    </div>
  </div>
);

export default Filter;
