import React from "react";
import PropTypes from "prop-types";
import languages from "../constants/languages";
import { dateFormat } from "../utils/helpers";
import { ReactComponent as ImdbLogo } from "../img/imdb.svg";

const Sidebar = (props) => {
  const {
    originalLanguage,
    originalName,
    homepage,
    production,
    budget,
    revenue,
    status,
    media,
    birthday,
    gender,
    imdbId,
    knownForDepartment,
    placeOfBirth,
    movieCredits,
    tvCredits,
  } = props;

  let prodCompanies;

  if (production) {
    prodCompanies = production.slice(0, 3).map((companie) => {
      return { name: companie.name };
    });
  }

  const langFilter = languages.filter(function (l) {
    return l.code === originalLanguage;
  });

  let personCreditsMovie = movieCredits ? movieCredits.cast.length : 0;
  let personCreditsTv = tvCredits ? tvCredits.cast.length : 0;
  const credits = personCreditsMovie + personCreditsTv;

  return (
    <aside className="sidebar">
      {/* <h4 className="sidebar__heading">{props.heading}</h4> */}
      {/* <div className="sidebar__list">
        {props.info.map((i) => {
          return (
            <div className="sidebar__row">
              <div className="sidebar__row-heading">{i.label}</div>
              <div className="sidebar__row-info">{i.data}</div>
            </div>
          );
        })}
        {media === "movie" ? (
          <div className="sidebar__row">
            <div className="sidebar__row-info">
              <a
                href={`http://www.imdb.com/title/${imdb}`}
                target="_blank"
                rel="noopener noreferrer"
                title="imdb"
              >
                <img src={imdbLogo} className="icon-imdb" alt="logo" />
              </a>
            </div>
          </div>
        ) : null}
      </div> */}
      <div className="sidebar__list">
        {media === "movie" || media === "tv" ? (
          <React.Fragment>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Status</div>
              <div className="sidebar__row-info">{status}</div>
            </div>
            {media === "tv" ? (
              <div className="sidebar__row">
                <div className="sidebar__row-heading">Original Name</div>
                <div className="sidebar__row-info">{originalName}</div>
              </div>
            ) : null}
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Original Language</div>
              <div className="sidebar__row-info">
                {originalLanguage ? langFilter[0].name : ""}
              </div>
            </div>
            {media === "movie" ? (
              <div className="sidebar__row">
                <div className="sidebar__row-heading">Budget</div>
                <div className="sidebar__row-info">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(budget)}
                </div>
              </div>
            ) : null}
            {media === "movie" ? (
              <div className="sidebar__row">
                <div className="sidebar__row-heading">Revenue</div>
                <div className="sidebar__row-info">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(revenue)}
                </div>
              </div>
            ) : null}
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Homepage</div>
              <div className="sidebar__row-info">
                <a href={homepage} target="_blank" rel="noopener noreferrer">
                  {homepage ? "Go to" : "-"}
                </a>
              </div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Production Companies</div>
              <div className="sidebar__row-info">
                <p>
                  {prodCompanies && prodCompanies[0]
                    ? prodCompanies[0].name
                    : ""}
                </p>
                <p>
                  {prodCompanies && prodCompanies[1]
                    ? prodCompanies[1].name
                    : ""}
                </p>
                <p>
                  {prodCompanies && prodCompanies[2]
                    ? prodCompanies[2].name
                    : ""}
                </p>
              </div>
            </div>
          </React.Fragment>
        ) : null}

        {media === "person" ? (
          <React.Fragment>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Known For</div>
              <div className="sidebar__row-info">{knownForDepartment}</div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Gender</div>
              <div className="sidebar__row-info">
                {gender === 2 ? "Male" : "Female"}
              </div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Birthday</div>
              <div className="sidebar__row-info">
                {birthday ? dateFormat(birthday) : "-"}
              </div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Place of Birth</div>
              <div className="sidebar__row-info">{placeOfBirth}</div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Official Site</div>
              <div className="sidebar__row-info">
                {homepage ? (
                  <a
                    href={`${homepage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Homepage"
                  >
                    Go to
                  </a>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Known Credits</div>
              <div className="sidebar__row-info">{credits}</div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-info">
                <a
                  href={`http://www.imdb.com/name/${imdbId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="imdb"
                >
                  <i className="icon-imdb">
                    <ImdbLogo />
                  </i>
                </a>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  revenue: PropTypes.number,
  production: PropTypes.array,
  budget: PropTypes.number,
  runtime: PropTypes.number,
  release_date: PropTypes.string,
  imdb: PropTypes.string,
  status: PropTypes.string,
  language: PropTypes.string,
  homepage: PropTypes.string,
};
