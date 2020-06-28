import React from "react";
import Video from "./Video";

const VideoList = ({ items = [], all, maxItemsToShow = 2 }) => {
  if (items.length === 0) {
    return <div>No Trailers</div>;
  }

  const videosList = items.map((video) => {
    return {
      key: video.key,
    };
  });

  return (
    <div className="video__grid">
      {all
        ? videosList.map((video) => {
            return <Video key={video.key} video={video} />;
          })
        : videosList.slice(0, maxItemsToShow).map((video) => {
            return <Video key={video.key} video={video} />;
          })}
    </div>
  );
};

export default VideoList;
