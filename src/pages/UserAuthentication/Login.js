// eslint-disable-next-line no-unused-vars
/* global chrome */
import React, { useState } from "react";

import { Row, Col, Container, Button, Input, FormGroup } from "reactstrap";

import { Link, withRouter } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { STORAGEKEY } from "../../components/Constant";
import { userAuthLogin } from "../../services/authService";
import {
  NotificationToastContainer,
  notifyError,
} from "../../components/Custom/notification";
import CustomLoader from "../../components/Common/CustomLoader/loader";
import { notificationMessageFunction } from "../../constants/notificationConst";
import Redirect from "./Redirect";

const Login = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsDataLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [modal, setModal] = useState(false);

  const LogInSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email address")
      .required("Please enter email address"),
    password: Yup.string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 character"),
  });
  const startLoading = () => {
    setIsDataLoading(true);
  };
  const stopLoading = () => {
    setIsDataLoading(false);
  };

  const handleSubmit = (values) => {
    const data = {
      email: values.email.toLowerCase(),
      password: values.password,
      remember_me: rememberMe,
    };
    startLoading();
    userAuthLogin(data)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        localStorage.setItem(STORAGEKEY.ACCESSTOKEN, data.accessToken);
        localStorage.setItem(STORAGEKEY.ROLE, data.role);
        localStorage.setItem(STORAGEKEY.EMAIL, data.email);
        localStorage.setItem(STORAGEKEY.NEW_FEATURE_ALERT, true);
        props.history.push("/user-dashboard");
        // window.location.reload();

        stopLoading();
      })
      .catch((err) => {
        stopLoading();
        if (err.data.error.message === "err_20") {
          localStorage.setItem(STORAGEKEY.EMAIL, data.email);
          props.history.push({
            pathname: "/verify-account",
            state: { show_later: false },
          });
          notifyError(
            "Your account is not verified, We have sent new verification code to your email address. Please check your inbox."
          );
        } else if (
          err.data.error.message === "err_15" ||
          err.data.error.message === "err_75"
        ) {
          notifyError("Your account is deactivated please contact admin.");
        } else if (err.data.error.message === "err_11") {
          setModal(true);
        } else {
          const errorMessage = err.data.error.message;
          notifyError(notificationMessageFunction(errorMessage));
        }
      });
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      <div className="account-pages pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              {isLoading && <CustomLoader />}
              <div className="card-radius card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white mb-0">
                      Sign in to continue to 1buy.io.
                    </p>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <div className="p-2">
                    <Formik
                      initialValues={{
                        email: "",
                        password: "",
                      }}
                      validationSchema={LogInSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched, values, handleChange }) => (
                        <Form>
                          <div className="mb-3">
                            <FormGroup>
                              <label htmlFor="email" className="">
                                Email
                              </label>
                              <div className="has-wrapper">
                                <Input
                                  style={{
                                    paddingRight: "30px",
                                  }}
                                  className={
                                    errors.email ? "border-danger" : ""
                                  }
                                  type="text"
                                  value={values.email}
                                  placeholder="Enter email"
                                  name="email"
                                  onChange={(e) => handleChange(e)}
                                />
                                <span className="has-icon">
                                  <i className={"mdi mdi-account"} />
                                </span>
                                {errors.email && touched.email && (
                                  <div
                                    style={{ fontSize: 14 }}
                                    className="text-left mt-1 text-danger"
                                  >
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </FormGroup>
                          </div>
                          <div className="mb-3">
                            <FormGroup>
                              <label htmlFor="email" className="">
                                Password
                              </label>
                              <div className="has-wrapper">
                                <Input
                                  style={{ paddingRight: "30px" }}
                                  className={
                                    errors.password && touched.password
                                      ? "border-danger"
                                      : ""
                                  }
                                  type={showPassword ? "text" : "password"}
                                  value={values.password}
                                  placeholder="Enter password"
                                  name="password"
                                  onChange={(e) => handleChange(e)}
                                />
                                <span
                                  className="has-icon"
                                  style={{ top: "4px" }}
                                >
                                  <i
                                    className={
                                      showPassword
                                        ? "mdi mdi-eye-outline"
                                        : "mdi mdi-eye-off"
                                    }
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  />
                                </span>
                                {errors.password && touched.password && (
                                  <div
                                    style={{ fontSize: 14 }}
                                    className="text-left mt-1 text-danger"
                                  >
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                            </FormGroup>
                          </div>

                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                              onChange={(e) => {
                                setRememberMe(e.target.checked);
                              }}
                              value={rememberMe}
                            ></input>
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                          <div
                            className="mt-3 text-center w-100 waves-effect waves-light"
                            style={{ width: "20%" }}
                          >
                            <Button
                              type="submit"
                              style={{ width: "100px", borderRadius: "8px" }}
                              name="btn"
                              className="btn btn-primary font-size-14"
                              color="primary"
                              onSubmit={(values) => handleSubmit(values)}
                            >
                              Log In
                            </Button>
                            {Redirect(modal, handleClose)}
                          </div>
                          <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-muted">
                              <i className="mdi mdi-lock me-1"></i> Forgot your
                              password?
                            </Link>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Don't have an account?
                  <Link to="/user-register" className="fw-medium text-primary">
                    &nbsp;Create New Account
                  </Link>
                </p>
              </div>
              <Row>
                <Col>
                  <div className="text-center">
                    Copyright © {new Date().getFullYear()}{" "}
                    <a href="https://1buy.io/" target="_blank" rel="noreferrer">
                      <b>1buy.io.</b>
                    </a>{" "}
                    All rights reserved
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <NotificationToastContainer />
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
