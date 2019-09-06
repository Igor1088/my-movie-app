import React from "react";
import Movies from "../containers/Movies";
import TvShows from "../containers/TvShows";

const Home = () => {
  return (
    <div>
      <Movies category="now_playing" heading="In Theatres" />
      <TvShows category="airing_today" heading="TV Shows Airing Today" />
    </div>
  );
};

export default Home;
