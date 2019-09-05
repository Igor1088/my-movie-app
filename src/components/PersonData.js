import React from 'react';
import PropTypes from 'prop-types';

const PersonData = (props) => {
    const {birthday, gender, homepage, imdb_id, known_for_department, place_of_birth, movie_credits, tv_credits} = props;

    let movieCredits = movie_credits.cast ? movie_credits.cast.length : 0;
    let tvCredits = tv_credits.cast ? tv_credits.cast.length : 0;

    // if(movie_credits.cast) {
    //     movieCredits = movie_credits.cast.length ? movie_credits.cast.length : 0;
    // }
    // if(tv_credits.cast) {
    //     tvCredits = tv_credits.cast.length ? tv_credits.cast.length : 0;
    // }

    const credits = movieCredits + tvCredits;

    return (
        <div className="movie__data-list">
            <div className="movie__data-item">
                <div className="movie__data-heading">Know For</div>
                <div className="movie__data-info">{known_for_department}</div>
            </div>
            <div className="movie__data-item">
                <div className="movie__data-heading">Gender</div>
                <div className="movie__data-info">{gender===2 ? 'Male' : 'Female'}</div>
            </div>
            <div className="movie__data-item">
                <div className="movie__data-heading">Birthday</div>
                <div className="movie__data-info">{birthday}</div>
            </div>
            <div className="movie__data-item">
                <div className="movie__data-heading">Place of Birth</div>
                <div className="movie__data-info">{place_of_birth}</div>
            </div>
            <div className="movie__data-item">
                <div className="movie__data-heading">Official Site</div>
                <div className="movie__data-info">{homepage ? <a href={`${homepage}`} target="_blank" rel="noopener noreferrer" title="Homepage">{homepage}</a> : '-'}</div>
            </div>
            <div className="movie__data-item">
                <div className="movie__data-heading">Known Credits</div>
                <div className="movie__data-info">{credits}</div>
            </div>
            <div className="movie__data-item">
                <div className="movie__data-heading">Imdb</div>
                <div className="movie__data-info">
                    <a href={`http://www.imdb.com/name/${imdb_id}`} target="_blank" rel="noopener noreferrer" title="imdb">@imdb</a> 
                </div>
            </div>
        </div>
    );
}

export default PersonData;

PersonData.defaultProps = {
    movie_credits: {},
    tv_credits: {}
}

PersonData.propTypes = {
    name: PropTypes.string,
    biography: PropTypes.string
  }