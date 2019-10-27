import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import messages from "../i18n";
import { IntlProvider } from "react-intl";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import GuestRoute from "./types/GuestRoute";
import UserRoute from "./types/UserRoute";

export default () => (
  // <IntlProvider locale="fr" messages={messages["en","fr"]}>

  <IntlProvider locale={"en"} messages={messages["en","fr"]}>
    <BrowserRouter>
      <Switch>
        <UserRoute default exact path="/channel/:channelId?" component={Home} />
        <GuestRoute exact path="/register" component={Register} />
        <GuestRoute exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  </IntlProvider>
);
