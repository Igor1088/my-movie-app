import React from "react";

const ImageGalleryModal = ({ modalOpen, setModal, fullWidth }) => (
  <div
    className={`gallery__modal ${modalOpen.open ? "open" : ""}`}
    onClick={() => setModal(false)}
  >
    <span className="gallery__modal-close"></span>
    <img
      className="gallery__modal-img"
      src={`https://image.tmdb.org/t/p/w${fullWidth}/${modalOpen.link}`}
      alt="backdrop"
    />
  </div>
);

export default ImageGalleryModal;
