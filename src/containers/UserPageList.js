import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions";
import {
  getUserData,
  getUserDataLoading,
  getUserDataError,
} from "../reducers/userData";
import Loader from "../components/Loader";
import ListItem from "../components/ListItem";

class UserPageList extends Component {
  componentDidMount() {
    this.props.fetchUserData(
      this.props.category,
      this.props.type,
      this.props.sortBy
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.path !== prevProps.match.path) {
      this.props.fetchUserData(
        this.props.category,
        this.props.type,
        this.props.sortBy
      );
    }
  }

  render() {
    const { error, loading, items, media } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return <div>Error!</div>;
    }

    return (
      <div>
        {items.total_results
          ? items.results.map((i) => {
              return <ListItem key={i.id} item={i} media={media} />;
            })
          : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: getUserData(state),
  loading: getUserDataLoading(state),
  error: getUserDataError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: bindActionCreators(actions.fetchUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPageList);
