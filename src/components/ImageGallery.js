import React, { useState } from "react";
import Image from "./Image";
import ImageGalleryModal from "./ImageGalleryModal";

const ImageGallery = ({
  all,
  items = [],
  previewNumber,
  previewWidth,
  fullWidth,
}) => {
  const [modalOpen, setModal] = useState({
    open: false,
    link: "",
  });

  if (items.length === 0) {
    return <div>No Images</div>;
  }

  return (
    <div>
      <div className="gallery">
        {all
          ? items.map((i) => {
              return (
                <Image
                  key={i.file_path}
                  size={previewWidth}
                  path={i.file_path}
                  handleClick={setModal}
                />
              );
            })
          : items.slice(0, previewNumber).map((i) => {
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
