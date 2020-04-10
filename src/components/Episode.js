import React, { Component } from "react";
import PersonSmall from "./PersonSmall";

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
              <div className="episode__date">{airDate}</div>
            </div>
            <div className="episode__info">
              <span className="episode__vote">
                <ion-icon name="star"></ion-icon>
              </span>{" "}
              {voteAverage.toFixed(1)} ({voteCount})
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
                {director ? director.name : "-"}
              </p>
              <p className="episode__writers">
                <strong>Written by:&nbsp;</strong>
                {writers.map((i) => (
                  <span>{i.name}</span>
                ))}
              </p>
            </div>
            <div className="episode__expanded-credits">
              <h4 className="episode__expanded-heading">Guest Stars</h4>
              <ul>
                {guestStars.map((i) => (
                  <li>
                    <PersonSmall
                      key={i.id}
                      id={i.id}
                      name={i.name}
                      role={i.character}
                      poster={i.profile_path}
                    />
                  </li>
                ))}
              </ul>
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
