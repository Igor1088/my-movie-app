import React from 'react';
import PropTypes from 'prop-types';

const MovieData = (props) => {
  const { 
    language, 
    homepage, 
    production, 
    runtime, 
    budget, 
    revenue, 
    release_date, 
    imdb, 
    status
  } = props;
  
  let prod__companies;
  let date;

  if(production) {
    prod__companies = production.slice(0,3).map( companie => {
      return {name: companie.name}
    });

    date = release_date.split('-').reverse().join('/');
  }

  return (
    <div className="movie__data-list">
        <div className="movie__data-item">
          <div className="movie__data-heading">Status</div>
          <div className="movie__data-info">{status}</div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Release Information</div>
          <div className="movie__data-info">{date}</div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Original Language</div>
          <div className="movie__data-info">{language}</div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Runtime</div>
          <div className="movie__data-info">{runtime} min</div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Budget</div>
          <div className="movie__data-info">&#36;{budget}</div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Revenue</div>
          <div className="movie__data-info">&#36;{revenue}</div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Homepage</div>
          <div className="movie__data-info">
            <a href={homepage} target="_blank" rel="noopener noreferrer">{homepage ? 'Go to' : '-'}</a>
          </div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">Production Companies</div>
          <div className="movie__data-info">
            <p>{prod__companies && prod__companies[0] ? prod__companies[0].name : ""}</p>
            <p>{prod__companies && prod__companies[1] ? prod__companies[1].name : ""}</p>
            <p>{prod__companies && prod__companies[2] ? prod__companies[2].name : ""}</p>
          </div>
        </div>
        <div className="movie__data-item">
          <div className="movie__data-heading">IMDB</div>
          <div className="movie__data-info">
          <a href={`http://www.imdb.com/title/${imdb}`} target="_blank" rel="noopener noreferrer" title="imdb">@imdb</a> 
          </div>
        </div>
    </div>
  );
}

export default MovieData;

MovieData.propTypes = {
  revenue: PropTypes.number,
  production: PropTypes.array,
  budget: PropTypes.number,
  runtime: PropTypes.number,
  release_date: PropTypes.string,
  imdb: PropTypes.string,
  status: PropTypes.string,
  language: PropTypes.string,
  homepage: PropTypes.string
}
