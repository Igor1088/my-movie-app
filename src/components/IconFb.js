import React from "react";
import { FaFacebookSquare } from "react-icons/fa";

const IconFb = ({ link }) =>
  link ? (
    <a
      href={`https://www.facebook.com/${link}`}
      target="_blank"
      rel="noopener noreferrer"
      title="Facebook"
    >
      <FaFacebookSquare />
    </a>
  ) : null;

export default IconFb;
