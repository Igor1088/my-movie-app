import React from "react";

const Video = ({ video }) => (
  <div className="video__item">
    <iframe
      title={video.key}
      className="embed-responsive-item"
      src={`//www.youtube.com/embed/${video.key}`}
      allowFullScreen="allowFullScreen"
      frameBorder="0"
    ></iframe>
  </div>
);

export default Video;
