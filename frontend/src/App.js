import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./user/components/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import Explore from "./explore/pages/Explore";
import AllPlaces from "./places/components/AllPlaces";
import Messenger from "./chat/Messenger";
import Profile from "./user/pages/Profile";
import Top5Places from "./places/pages/Top5Places";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/bestplaces" exact>
          <Top5Places />
        </Route>
        <Route path="/places" exact>
          <AllPlaces />
        </Route>
        <Route path="/messenger" exact>
          <Messenger />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/explore">
          <Explore />
        </Route>
        <Route path="/bestplaces" exact>
          <Top5Places />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
