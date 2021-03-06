import React from "react";
import PropTypes from "prop-types";
import languages from "../constants/languages";
import { dateFormat } from "../utils/helpers";
import { FaLink } from "react-icons/fa";

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
    knownForDepartment,
    placeOfBirth,
    movieCredits,
    tvCredits,
  } = props;

  let prodCompanies;

  if (production) {
    prodCompanies = production.map((companie) => {
      return companie.logo_path ? (
        <div className="sidebar__companie-info">
          <img
            src={`https://image.tmdb.org/t/p/h30${companie.logo_path}`}
            className="companie-logo"
            alt="logo"
          />
        </div>
      ) : null;
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
                  {homepage ? <FaLink /> : null}
                </a>
              </div>
            </div>
            <div className="sidebar__row">
              <div className="sidebar__row-heading">Production Companies</div>
              <div className="sidebar__row-info">{prodCompanies}</div>
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
                    title="Official Site"
                  >
                    <FaLink />
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
  status: PropTypes.string,
  language: PropTypes.string,
  homepage: PropTypes.string,
};
