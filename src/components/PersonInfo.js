import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as FbLogo } from "../img/facebook.svg";
import { ReactComponent as TwtLogo } from "../img/twitter.svg";
import { ReactComponent as InstLogo } from "../img/instagram.svg";

const PersonInfo = (props) => {
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
          <h2>{name}</h2>
          <div className="person__icons-holder">
            {facebookLink ? (
              <a
                href={`https://www.facebook.com/${facebookLink}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <i className="icon-fb">
                  <FbLogo />
                </i>
              </a>
            ) : null}

            {instagramLink ? (
              <a
                href={`https://www.instagram.com/${instagramLink}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
              >
                <i className="icon-inst">
                  <InstLogo />
                </i>
              </a>
            ) : null}

            {twitterLink ? (
              <a
                href={`https://www.twitter.com/${twitterLink}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Twitter"
              >
                <i className="icon-twt">
                  <TwtLogo />
                </i>
              </a>
            ) : null}
          </div>
        </div>
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
