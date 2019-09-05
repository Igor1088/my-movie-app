import React from "react";

const Video = props => {
  const { id, videos = { results: [] } } = props;
  const videosList = videos.results.slice(0, 2).map(video => {
    return {
      key: video.key
    };
  });

  return (
    <div className="video__container">
      {videosList.map(video => {
        return (
          <div className="video__item-holder">
            <div className="video__item">
              <iframe
                title={video.key}
                className="embed-responsive-item"
                src={`//www.youtube.com/embed/${video.key}`}
              ></iframe>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Video;
