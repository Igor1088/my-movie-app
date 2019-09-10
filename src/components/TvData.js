import React from "react";
import PropTypes from "prop-types";
import languages from "../constants/languages";

const TvData = props => {
  const {
    language,
    production,
    runtime,
    release_date,
    status,
    homepage
  } = props;

  let prod__companies;

  if (production) {
    prod__companies = production.slice(0, 3).map(companie => {
      return { name: companie.name };
    });
  }

  const lang = languages.filter(function(l) {
    return l.code === language;
  });

  return (
    <div className="movie__data-list">
      <div className="movie__data-item">
        <div className="movie__data-heading">Status</div>
        <div className="movie__data-info">{status}</div>
      </div>
      <div className="movie__data-item">
        <div className="movie__data-heading">Release Information</div>
        <div className="movie__data-info">{release_date}</div>
      </div>
      <div className="movie__data-item">
        <div className="movie__data-heading">Original Language</div>
        <div className="movie__data-info">{language ? lang[0].name : ""}</div>
      </div>
      <div className="movie__data-item">
        <div className="movie__data-heading">Runtime</div>
        <div className="movie__data-info">{runtime ? runtime[0] : "-"} min</div>
      </div>
      <div className="movie__data-item">
        <div className="movie__data-heading">Homepage</div>
        <div className="movie__data-info">
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            {homepage ? "Go to" : "-"}
          </a>
        </div>
      </div>
      <div className="movie__data-item">
        <div className="movie__data-heading">Production Companies</div>
        <div className="movie__data-info">
          <p>
            {prod__companies && prod__companies[0]
              ? prod__companies[0].name
              : ""}
          </p>
          <p>
            {prod__companies && prod__companies[1]
              ? prod__companies[1].name
              : ""}
          </p>
          <p>
            {prod__companies && prod__companies[2]
              ? prod__companies[2].name
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TvData;

TvData.propTypes = {
  revenue: PropTypes.number,
  production: PropTypes.array,
  budget: PropTypes.number,
  release_date: PropTypes.string,
  imdb: PropTypes.string,
  status: PropTypes.string,
  language: PropTypes.string,
  homepage: PropTypes.string
};
