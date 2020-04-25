import React, { useState } from "react";
import Image from "./Image";
import ImageGalleryModal from "./ImageGalleryModal";

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
          <ImageGalleryModal
            modalOpen={modalOpen}
            setModal={setModal}
            fullWidth={fullWidth}
          />
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
        <ImageGalleryModal
          modalOpen={modalOpen}
          setModal={setModal}
          fullWidth={fullWidth}
        />
      </div>
    </div>
  );
};

export default ImageGallery;
