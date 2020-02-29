import React from "react";
import PropTypes from "prop-types";

const PersonInfo = props => {
  const { name, biography, poster, social } = props;

  const facebookLink = social ? social.facebook_id : "";
  const instagramLink = social ? social.instagram_id : "";
  const twitterLink = social ? social.twitter_id : "";

  return (
    <div className="person__info">
      <div className="person__image-holder">
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster}`}
          className="person__image"
          alt="poster"
        />
      </div>
      <div className="person__overview-holder">
        <div className="person__heading">
          <h1>{name}</h1>
          <div className="person__icons-holder">
            <a
              href={`https://www.facebook.com/${facebookLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
            >
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a
              href={`https://www.twitter.com/${twitterLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
            >
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
            <a
              href={`https://www.instagram.com/${instagramLink}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </div>
        </div>
        <div className="person__biography">
          <h4 className="person__overview-heading">Biography</h4>
          <p className="person__biography-text">{biography}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;

PersonInfo.propTypes = {
  name: PropTypes.string,
  biography: PropTypes.string,
  poster: PropTypes.string
};
