import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getUserDataLoading,
  getUserLists,
  getUserListSort,
} from "../reducers/userData";
import { isEmpty } from "lodash";
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

class UserPageList extends Component {
  componentDidMount() {
    if (localStorage.getItem("session_id")) {
      const media = this.props.location.state.media;
      this.props.sortUsersList(true);
      this.props.fetchAllUserData(media);
    } else {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps) {
    const oldId = prevProps.match.params.id;
    const newId = this.props.match.params.id;
    const media = this.props.location.state.media;

    if (oldId !== newId) {
      this.props.fetchAllUserData(media);
    }
  }

  handleSort = () => {
    const category = this.props.location.state.category;
    const media = this.props.location.state.media;

    this.props.sortUsersList(!this.props.listSort);
    this.props.fetchUserData(category, media);
  };

  handleFavoriteClick = (like, id) => {
    const media = this.props.location.state.media;
    this.props.userListAction(id, "favorite", media, like);
  };

  handleWatchlistClick = (like, id) => {
    const media = this.props.location.state.media;
    this.props.userListAction(id, "watchlist", media, like);
  };

  render() {
    const { loading, list, location } = this.props;
    const category = (location.state && location.state.category) || "favorite";
    const media = (location.state && location.state.media) || "movies";
    const listEmpty = isEmpty(list[category][media]);
    const favorites = list["favorite"][media].results;
    const watchlist = list["watchlist"][media].results;
    const rated = list["rated"][media].results;

    if (listEmpty) {
      return <div>Nothing in the list</div>;
    }

    return (
      <div>
        <div className="list__head">
          <h3 className="list__heading">{`${media} ${category}`}</h3>
          <div className="list__options">
            <button className="list__sort-btn" onClick={this.handleSort}>
              <span>Date Added</span>
              {this.props.listSort ? <FaSortAmountDown /> : <FaSortAmountUp />}
            </button>
          </div>
        </div>
        <div className="list">
          {list[category][media].results.map((i) => {
            return (
              <ListItem
                key={i.id}
                item={i}
                media={media === "movies" ? "movie" : media}
                favorites={favorites}
                handleFavoriteClick={this.handleFavoriteClick}
                watchlist={watchlist}
                handleWatchlistClick={this.handleWatchlistClick}
                ratedList={rated}
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
  listSort: getUserListSort(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: bindActionCreators(actions.fetchUserData, dispatch),
  fetchAllUserData: bindActionCreators(actions.fetchAllUserData, dispatch),
  userListAction: bindActionCreators(actions.userListAction, dispatch),
  sortUsersList: bindActionCreators(actions.sortUsersList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPageList);
