import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const CreditsList = (props) => {
    const {credits, media, heading} = props;

    let list = credits ? credits : {};
    let creditsList;

    if(list) {
        creditsList = list.map( credit => {
            return (
                <div key={credit.id} className="credits__item">
                    <Link to={`/${media}/${credit.id}`}>{credit.title}</Link> - <span>{credit.character || credit.job}</span>
                </div>
            )
        });
    }

    return (
        <div className="credits__list">
            {creditsList.length !== 0 ? <div><h4>{heading}</h4>{creditsList}</div> : <div></div>}
        </div>
    );
}

export default CreditsList;

CreditsList.propTypes = {
    movie_credits: PropTypes.object,
    tv_credits: PropTypes.object
  }