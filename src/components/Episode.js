import React, { Component } from "react";
import { dateFormat } from "../utils/helpers";
import { Link } from "react-router-dom";
import CastList from "./CastList";
import { FaStar } from "react-icons/fa";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  handleToggle = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const {
      poster,
      voteAverage,
      voteCount,
      name,
      overview,
      seasonNumber,
      episodeNumber,
      airDate,
      crew,
      guestStars,
    } = this.props;

    const placeholder = "http://placehold.it/154x230";
    const path = poster
      ? `https://image.tmdb.org/t/p/w154/${poster}`
      : placeholder;

    const director = crew.find((i) => i.department === "Directing");
    const writers = crew.filter((i) => i.department === "Writing");

    return (
      <div className="episode">
        <div className="episode__container">
          <div className="episode__img-holder">
            <img src={path} className="episode__image" alt="poster" />
            <div className="episode__number">
              S{seasonNumber < 10 ? "0" + seasonNumber : seasonNumber}, Ep
              {episodeNumber < 10 ? "0" + episodeNumber : episodeNumber}
            </div>
          </div>
          <div className="episode__details">
            <div className="episode__heading">
              <h4 className="episode__name">{name}</h4>
              <div className="episode__date">
                {airDate ? dateFormat(airDate) : ""}
              </div>
            </div>
            <div className="episode__info">
              <div className="episode__vote">
                <i className="icon-star">
                  <FaStar />
                </i>
                <div className="episode__vote-details">
                  <div>{voteAverage.toFixed(1)}/10</div>
                  <small>({voteCount})</small>
                </div>
              </div>
            </div>
            <div className="episode__overview">{overview}</div>
          </div>
        </div>
        <div
          className={`episode__expanded ${
            this.state.expanded ? "expanded" : ""
          }`}
        >
          <div className="episode__expanded-details">
            <div className="episode__expanded-crew">
              <h4 className="episode__expanded-heading">Crew</h4>
              <p className="episode__director">
                <strong>Directed by:&nbsp;</strong>
                {director ? (
                  <Link to={`/person/${director.id}`}>{director.name}</Link>
                ) : (
                  "-"
                )}
              </p>
              <p className="episode__writers">
                <strong>Written by:&nbsp;</strong>
                {writers.length > 0
                  ? writers.map((i) => (
                      <Link to={`/person/${i.id}`}>{i.name}</Link>
                    ))
                  : "-"}
              </p>
            </div>
            <div className="episode__expanded-credits">
              <h4 className="episode__expanded-heading">Guest Stars</h4>
              <CastList list={guestStars} message="No guest stars" />
            </div>
          </div>
        </div>
        <div className="episode__toggle" onClick={this.handleToggle}>
          {this.state.expanded ? "Show Less" : "Show More"}
        </div>
      </div>
    );
  }
}

export default Episode;
