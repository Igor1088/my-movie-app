import React from "react";
import { Switch, Route } from "react-router-dom";
import UserPageList from "../containers/UserPageList";
import Nav from "./UserNav";

const UserPage = () => (
  <div>
    <Nav />
    <Switch>
      <Route
        path="/u"
        exact
        render={props => (
          <UserPageList
            {...props}
            category="favorite"
            type="movies"
            sortBy="desc"
            media="movie"
          />
        )}
      ></Route>
      <Route
        path="/u/favorites"
        exact
        render={props => (
          <UserPageList
            {...props}
            category="favorite"
            type="movies"
            sortBy="desc"
            media="movie"
          />
        )}
      ></Route>
      <Route
        path="/u/favorites/tv"
        render={props => (
          <UserPageList
            {...props}
            category="favorite"
            type="tv"
            sortBy="desc"
            media="tv"
          />
        )}
      ></Route>
      <Route
        path="/u/watchlist"
        exact
        render={props => (
          <UserPageList
            {...props}
            category="watchlist"
            type="movies"
            sortBy="desc"
            media="movie"
          />
        )}
      ></Route>
      <Route
        path="/u/watchlist/tv"
        render={props => (
          <UserPageList
            {...props}
            category="watchlist"
            type="tv"
            sortBy="desc"
            media="tv"
          />
        )}
      ></Route>
    </Switch>
  </div>
);

export default UserPage;
