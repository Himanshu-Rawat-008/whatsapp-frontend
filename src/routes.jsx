import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat, Home, Signin, Signup } from "./pages";

import UserProvider from "./context/userContext";
import { IsUserRedirect, ProtectedRoute } from "./helpers/protectedRoutes";

function Routes() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );
  return (
    <UserProvider data={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <IsUserRedirect user={user} loggedInPath={"/chat"} path={"/signup"}>
            <Signup />
          </IsUserRedirect>
          <IsUserRedirect
            exact
            user={user}
            loggedInPath={"/chat"}
            path={"/signin"}
          >
            <Signin />
          </IsUserRedirect>

          <ProtectedRoute user={user} path={"/chat"}>
            <Chat />
          </ProtectedRoute>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default Routes;
