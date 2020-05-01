import React from "react";
import GridPreview from "../containers/GridPreview";

const HomePreview = () => (
  <section className="home-preview">
    <div className="home-preview__column">
      <GridPreview media="movie" category="now_playing" heading="In Theatres" />
    </div>
    <div className="home-preview__column">
      <GridPreview media="tv" category="airing_today" heading="Airing Today" />
    </div>
  </section>
);

export default HomePreview;
