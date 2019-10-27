import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { userStorage } from "../../utils/static_constants";
import decode from "./decode";

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      decode() &&
      localStorage.getItem(userStorage).roles.indexOf("admin") > -1 ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default withRouter(AdminRoute);
