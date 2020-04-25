import React from "react";
import { FaInstagram } from "react-icons/fa";

const IconInstagram = ({ link }) =>
  link ? (
    <a
      href={`https://www.instagram.com/${link}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Instagram"
    >
      <FaInstagram />
    </a>
  ) : null;

export default IconInstagram;
