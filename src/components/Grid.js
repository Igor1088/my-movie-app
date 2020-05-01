import React from "react";
import PropTypes from "prop-types";
import Item from "./Item";

const Grid = ({ items = [], media, preview }) => (
  <div className={`grid ${preview ? "preview" : ""}`}>
    {items.map((i) => {
      return (
        <Item
          key={i.id}
          id={i.id}
          poster={i.poster_path || i.profile_path}
          title={i.title || i.name}
          vote_average={i.vote_average}
          media={media}
          year={i.release_date || i.first_air_date}
          preview={preview}
        />
      );
    })}
  </div>
);

export default Grid;

Grid.propTypes = {
  items: PropTypes.array,
  media: PropTypes.string,
};
