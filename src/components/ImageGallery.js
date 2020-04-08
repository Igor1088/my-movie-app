import React, { useState } from "react";
import Image from "./Image";

const ImageGallery = ({
  images = [],
  previewNumber,
  previewWidth,
  fullWidth,
}) => {
  const [all, setView] = useState(false);
  const [modalOpen, setModal] = useState({
    open: false,
    link: "",
  });

  if (images.length === 0) {
    return <div>No Images</div>;
  }

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
                handleClick={setModal}
              />
            );
          })}
          <div className={`gallery__modal ${modalOpen.open ? "open" : ""}`}>
            <span
              className="gallery__modal-close"
              onClick={() => setModal(false)}
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
  }

  return (
    <div>
      <div className="gallery--toggle">
        <button onClick={() => setView(!all)}>
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
                  handleClick={setModal}
                />
              );
            })
          : images.slice(0, previewNumber).map((i) => {
              return (
                <Image
                  key={i.file_path}
                  size={previewWidth}
                  path={i.file_path}
                  handleClick={setModal}
                />
              );
            })}
        <div className={`gallery__modal ${modalOpen.open ? "open" : ""}`}>
          <span
            className="gallery__modal-close"
            onClick={() => setModal(false)}
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
