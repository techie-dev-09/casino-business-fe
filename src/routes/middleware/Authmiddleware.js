import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { STORAGEKEY } from "../../components/Constant";
const Authmiddleware = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => (
  <Route
    // {...rest}

    render={(props) => {
      if (isAuthProtected && !localStorage.getItem(STORAGEKEY.ACCESSTOKEN)) {
        return (
          <Redirect
            to={{ pathname: "/user-login", state: { from: props.location } }}
          />
        );
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
