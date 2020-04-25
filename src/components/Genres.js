import React from "react";

const Genres = ({ list }) => (
  <div className="media__genres">
    {list.map((i) => {
      return (
        <div key={i.id} className="media__genres-item">
          {i.name}
        </div>
      );
    })}
  </div>
);

export default Genres;
