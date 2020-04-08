import React, { useState } from "react";
import Image from "./Image";

const ImageGallery = ({ images, previewNumber, previewWidth, fullWidth }) => {
  const [all, toggleView] = useState(false);
  const [modalOpen, toggleModal] = useState({
    open: false,
    link: "",
  });

  if (images.length <= previewNumber) {
    return (
      <div>
        <div className="gallery">
          {images.map((i) => {
            return (
              <Image
                key={i.file_path}
                size={previewWidth}
                path={i.file_path}
                handleClick={toggleModal}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return <div>No Images</div>;
  }

  return (
    <div>
      <div className="gallery--toggle">
        <button onClick={() => toggleView(!all)}>
          {all ? "Show Less" : `All Images(${images.length})`}
        </button>
      </div>
      <div className="gallery">
        {all
          ? images.map((i) => {
              return (
                <Image
                  key={i.file_path}
                  size={previewWidth}
                  path={i.file_path}
                  handleClick={toggleModal}
                />
              );
            })
          : images.slice(0, previewNumber).map((i) => {
              return (
                <Image
                  key={i.file_path}
                  size={previewWidth}
                  path={i.file_path}
                  handleClick={toggleModal}
                />
              );
            })}
        <div className={`gallery__modal ${modalOpen.open ? "open" : ""}`}>
          <span
            className="gallery__modal-close"
            onClick={() => toggleModal(false)}
          ></span>
          <img
            className="gallery__modal-img"
            src={`https://image.tmdb.org/t/p/w${fullWidth}/${modalOpen.link}`}
            alt="backdrop"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

ImageGallery.defaultProps = {
  images: [],
};
