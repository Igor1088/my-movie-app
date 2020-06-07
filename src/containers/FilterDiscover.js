import React, { useState, Fragment } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { movieGenres, tvGenres } from "../constants/genres";

const FilterDiscover = (props) => {
  const [score, setScore] = useState({ min: 0, max: 10 });
  const [voteCount, setVoteCount] = useState(0);
  const [runtime, setRuntime] = useState({ min: 0, max: 400 });
  const [genres, setGenres] = useState([]);
  const [selectValue, setSelectValue] = useState("popularity.desc");

  const mediaGenres = props.media === "movie" ? movieGenres : tvGenres;

  const handleSubmit = () => {
    props.handleSubmit(
      voteCount,
      score.min,
      score.max,
      runtime.min,
      runtime.max,
      genres,
      selectValue
    );
  };

  return (
    <div className={`discover-filter ${props.show ? "show" : ""}`}>
      <h3 className="discover-filter__heading">Filter</h3>
      <div className="discover-filter__row">
        <div className="discover-filter__row-label">Sort By</div>
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
        >
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          {props.media === "tv" && (
            <Fragment>
              <option value="first_air_date.desc">
                First Air Date Descending
              </option>
              <option value="first_air_date.asc">
                First Air Date Ascending
              </option>
            </Fragment>
          )}
          {props.media === "movie" && (
            <Fragment>
              <option value="release_date.desc">Release Date Descending</option>
              <option value="release_date.asc">Release Date Ascending</option>
              <option value="revenue.desc">Revenue Descending</option>
              <option value="revenue.asc">Revenue Ascending</option>
              <option value="original_title.desc">Title (A-Z)</option>
              <option value="original_title.asc">Title (Z-A)</option>
            </Fragment>
          )}
        </select>
      </div>
      <div className="discover-filter__row">
        <div className="discover-filter__row-label">Genres</div>
        <ul className="discover-filter__list">
          {mediaGenres.map((i) => (
            <li
              className={genres.includes(i.id) ? "selected" : ""}
              key={i.id}
              data-value={i.id}
              onClick={() =>
                genres.includes(i.id)
                  ? setGenres(genres.filter((g) => g !== i.id))
                  : setGenres([...genres, i.id])
              }
            >
              {i.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="discover-filter__row">
        <div className="discover-filter__row-label">User Score</div>
        <InputRange
          maxValue={10}
          minValue={0}
          value={score}
          onChange={(value) => setScore(value)}
        />
      </div>
      <div className="discover-filter__row">
        <div className="discover-filter__row-label">Minimum User votes</div>
        <InputRange
          maxValue={500}
          minValue={0}
          step={50}
          value={voteCount}
          onChange={(value) => setVoteCount(value)}
        />
      </div>
      <div className="discover-filter__row">
        <div className="discover-filter__row-label">Runtime</div>
        <InputRange
          maxValue={400}
          step={15}
          minValue={0}
          value={runtime}
          onChange={(value) => setRuntime(value)}
        />
      </div>
      <div className="discover-filter__row">
        <button className="discover-btn" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default FilterDiscover;
