import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { addClass: false };
  }

  toggle = () => {
    this.setState({ addClass: !this.state.addClass });
  };

  render() {
    const { title, data } = this.props;
    let ddClass = ["dropdown"];

    if (this.state.addClass) {
      ddClass.push("open");
    }

    return (
      <div
        className={ddClass.join(" ")}
        onMouseEnter={this.toggle}
        onMouseLeave={this.toggle}
      >
        <div className="dropdown__toggle">{title}</div>
        <div className="dropdown__menu">
          {data.map(item => {
            return (
              <div key={item.id} className="dropdown__item">
                <Link to={`${item.route}`}>{item.link}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Dropdown;

Dropdown.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array
};
