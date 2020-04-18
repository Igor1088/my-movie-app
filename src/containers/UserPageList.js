import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import { getUserDataLoading, getUserLists } from "../reducers/userData";
import { isEmpty } from "lodash";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

class UserPageList extends Component {
  componentDidMount() {
    const category = this.props.location.state.category;
    const media = this.props.location.state.media;
    this.props.fetchUserData(category, media);
  }

  render() {
    const { loading, list, location } = this.props;
    const category = location.state.category;
    const media = location.state.media;

    if (loading) {
      return <Loader />;
    }

    if (isEmpty(list[category][media])) {
      return <div>Nothing in the list</div>;
    }

    return (
      <div>
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
