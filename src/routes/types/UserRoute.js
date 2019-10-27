import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import decode from "./decode";

const UserRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      decode() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default withRouter(UserRoute);
