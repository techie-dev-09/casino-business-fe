/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
// import OneSignal from "react-onesignal";
// Import Routes all
import { userRoutes, authRoutes, adminRoutes } from "./routes/allRoutes";

// Import all middleware
import Authmiddleware from "./routes/middleware/Authmiddleware";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";

import NonAuthLayout from "./components/NonAuthLayout";

import "./assets/scss/theme.scss";
import { STORAGEKEY } from "./components/Constant";
import { NotificationToastContainer } from "./components/Custom/notification";

const App = (props) => {
  let role = localStorage.getItem(STORAGEKEY.ROLE);
  function getLayout() {
    let layoutCls = VerticalLayout;

    switch (props.layout.layoutType) {
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  }

  const Layout = getLayout();
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
            />
          ))}

          {role === "admin"
            ? adminRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  exact
                />
              ))
            : userRoutes.map((route, idx) => (
                <Authmiddleware
                  path={route.path}
                  layout={Layout}
                  component={route.component}
                  key={idx}
                  isAuthProtected={true}
                  exact
                />
              ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
