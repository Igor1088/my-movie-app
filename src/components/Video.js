import React from "react";

const Video = (props) => {
  const { videos = { results: [] } } = props;
  const videosList = videos.map((video) => {
    return {
      key: video.key,
    };
  });

  return (
    <div className="video__container">
      {videosList.map((video) => {
        return (
          <div className="video__item-holder" key={video.key}>
            <div className="video__item">
              <iframe
                title={video.key}
                className="embed-responsive-item"
                src={`//www.youtube.com/embed/${video.key}`}
                allowFullScreen="allowFullScreen"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Video;
