import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { getUserDataLoading, getUserLists } from "../reducers/userData";
import { isEmpty } from "lodash";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

class UserPageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortDesc: true,
    };
  }

  componentDidMount() {
    const category = this.props.location.state.category;
    const media = this.props.location.state.media;
    this.props.fetchUserData(category, media);
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.match.params.id;
    const newId = this.props.match.params.id;
    const category = this.props.location.state.category;
    const media = this.props.location.state.media;
    const sort = this.state.sortDesc ? "desc" : "asc";

    if (oldId !== newId) {
      this.props.fetchUserData(category, media, sort);
    }
  }

  handleSort = () => {
    const category = this.props.location.state.category;
    const media = this.props.location.state.media;
    const sort = !this.state.sortDesc ? "desc" : "asc";

    this.setState((state) => ({ sortDesc: !this.state.sortDesc }));
    this.props.fetchUserData(category, media, sort);
  };

  render() {
    const { loading, list, location } = this.props;
    const category = location.state.category;
    const media = location.state.media;
    const listEmpty = isEmpty(list[category][media])
      ? false
      : list[category][media].results.length;

    if (loading) {
      return <Loader />;
    }

    if (!listEmpty) {
      return <div>Nothing in the list</div>;
    }

    return (
      <div>
        <div className="list__options">
          <button className="list__sort-btn" onClick={this.handleSort}>
            <span>Date Added</span>
            {this.state.sortDesc ? <FaSortAmountDown /> : <FaSortAmountUp />}
          </button>
        </div>
        <div className="list">
          {list[category][media].results.map((i) => {
            return (
              <ListItem
                key={i.id}
                item={i}
                media={media === "movies" ? "movie" : media}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: getUserDataLoading(state),
  list: getUserLists(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: bindActionCreators(actions.fetchUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPageList);
