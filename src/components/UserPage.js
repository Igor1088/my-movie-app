import React from "react";
import { Route } from "react-router-dom";
import UserPageList from "../containers/UserPageList";
import UserNav from "./UserNav";

const UserPage = (props) => {
  return (
    <div>
      <UserNav />
      <Route path="/u/favorites/:id" component={UserPageList}></Route>
      <Route path="/u/watchlist/:id" component={UserPageList}></Route>
      <Route path="/u/rated/:id" component={UserPageList}></Route>
    </div>
  );
};

export default UserPage;
