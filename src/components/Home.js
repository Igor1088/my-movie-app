import React from "react";
import Movies from "../containers/Movies";
import TvShows from "../containers/TvShows";
import People from "../containers/People";
import HomePreview from "./HomePreview";

const Home = () => {
  return (
    <main>
      <HomePreview />
      <Movies
        category="trending"
        heading="Trending Movies"
        filters={true}
        preview={true}
        previewItemsCount={7}
      />
      <TvShows
        category="trending"
        heading="Trending TV Shows"
        filters={true}
        preview={true}
        previewItemsCount={7}
      />
      <People
        category="trending"
        heading="Trending People"
        filters={true}
        preview={true}
        previewItemsCount={7}
      />
    </main>
  );
};

export default Home;
