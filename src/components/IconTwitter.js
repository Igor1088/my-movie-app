import React from "react";
import { FaTwitterSquare } from "react-icons/fa";

const IconTwitter = ({ link }) =>
  link ? (
    <a
      href={`https://www.twitter.com/${link}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Twitter"
    >
      <FaTwitterSquare />
    </a>
  ) : null;

export default IconTwitter;
