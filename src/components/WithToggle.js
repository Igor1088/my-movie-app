import React from "react";

const withToggle = (Component) => {
  return class WithToggle extends React.Component {
    state = { all: false };

    toggleAll = () => {
      this.setState({ all: !this.state.all });
    };

    render() {
      const itemsLength = this.props.items ? this.props.items.length : 0;

      const props = {
        all: this.state.all,
        ...this.props,
      };

      return (
        <div>
          <div className="toggle-holder">
            {itemsLength > this.props.maxItemsToShow ? (
              <button className="btn-toggle" onClick={this.toggleAll}>
                {this.state.all ? "Show Less" : `Show All (${itemsLength})`}
              </button>
            ) : null}
          </div>
          <Component {...props} />
        </div>
      );
    }
  };
};

export default withToggle;
