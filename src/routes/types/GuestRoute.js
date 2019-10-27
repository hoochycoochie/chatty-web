import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import decode from "./decode";

const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !decode() ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

export default withRouter(GuestRoute);
