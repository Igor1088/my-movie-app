import React from "react";
import PropTypes from "prop-types";
import {
  FaImdb,
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagram,
} from "react-icons/fa";

const PersonInfo = (props) => {
  const { name, biography, poster, social } = props;

  const facebookLink = social ? social.facebook_id : "";
  const instagramLink = social ? social.instagram_id : "";
  const twitterLink = social ? social.twitter_id : "";
  const imdbLink = social ? social.imdb_id : "";
  const placeholder = "http://placehold.it/300x450";
  const path = poster
    ? `https://image.tmdb.org/t/p/w500${poster}`
    : placeholder;

  return (
    <div className="person__info">
      <div className="person__image-holder">
        <img src={path} className="person__image" alt="poster" />
        <div className="person__icons-holder">
          {facebookLink ? (
            <a
              href={`https://www.facebook.com/${facebookLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <FaFacebookSquare />
            </a>
          ) : null}

          {instagramLink ? (
            <a
              href={`https://www.instagram.com/${instagramLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          ) : null}

          {twitterLink ? (
            <a
              href={`https://www.twitter.com/${twitterLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <FaTwitterSquare />
            </a>
          ) : null}

          {imdbLink ? (
            <a
              href={`http://www.imdb.com/name/${imdbLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Imdb"
            >
              <FaImdb />
            </a>
          ) : null}
        </div>
      </div>
      <div className="person__overview-holder">
        <h2 className="person__heading">{name}</h2>
        <div className="person__biography">
          <h4 className="person__overview-heading">Biography</h4>
          <p className="person__biography-text">
            {biography ? biography : `We don't have a biography for ${name}.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;

PersonInfo.propTypes = {
  name: PropTypes.string,
  biography: PropTypes.string,
  poster: PropTypes.string,
};
