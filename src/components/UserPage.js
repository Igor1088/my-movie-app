import React from "react";
import { Route } from "react-router-dom";
import UserPageList from "../containers/UserPageList";
import UserNav from "./UserNav";
import Loader from "../components/Loader";

const UserPage = (props) => {
  return (
    <div>
      <UserNav />
      <Route path="/u/favorites" exact component={UserPageList}></Route>
      <Route path="/u/favorites/tv" component={UserPageList}></Route>
      <Route path="/u/watchlist/movies" exact component={UserPageList}></Route>
      <Route path="/u/watchlist/tv" component={UserPageList}></Route>
    </div>
  );
};

export default UserPage;
