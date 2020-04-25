import React from "react";
import { FaImdb } from "react-icons/fa";

const IconImdb = ({ title, link }) =>
  link ? (
    <a
      href={`http://www.imdb.com/${title}/${link}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Go to Imdb"
      className="icon-imdb"
    >
      <FaImdb />
    </a>
  ) : null;

export default IconImdb;
