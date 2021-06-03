import React from "react";
import { Redirect, Route } from "react-router";

export function IsUserRedirect({ children, user, loggedInPath, ...props }) {
  return (
    <Route
      {...props}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }

        return null;
      }}
    />
  );
}

export function ProtectedRoute({ children, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return (
            <Redirect to={{ pathname: "signin", state: { from: location } }} />
          );
        }

        if (user) {
          return children;
        }

        return null;
      }}
    />
  );
}
