import React from 'react';
import Movies from '../containers/Movies';
import TvShows from '../containers/TvShows';

const Home = () => {
  return (
    <div>
      <Movies category="now_playing" heading="In Theatres"/>
      <TvShows category="on_the_air"/>
    </div>
  );
}

export default Home;