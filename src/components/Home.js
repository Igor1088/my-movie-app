import React from "react";
import Movies from "../containers/Movies";
import TvShows from "../containers/TvShows";
import People from "../containers/People";

const Home = () => {
  return (
    <div>
      <Movies category="trending" heading="Trending Movies" filters={true} />
      <TvShows category="trending" heading="Trending TV Shows" filters={true} />
      <People category="trending" heading="Trending People" filters={true} />
    </div>
  );
};

export default Home;
