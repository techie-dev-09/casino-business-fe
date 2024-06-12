import React, { useState } from "react";
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";

import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/Custom/textinput";

import {
  userForgotPassword,
  userResetPassword,
} from "../../services/authService";

import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import { notificationMessageFunction } from "../../constants/notificationConst";
import { STORAGEKEY } from "../../components/Constant";
import { constants as CONSTS } from "../../constants/constants";

const ResetPassword = (props) => {
  const resetPasswordSchema = Yup.object().shape({
    // email: Yup.string()
    //   .email("Enter Valid Email Address")
    //   .required("Please Enter E-mail Address"),
    resetotp: Yup.string().required("Please enter verification code"),
    newPassword: Yup.string()
      .required("Please enter new password")
      .min(8, "Password must be at least 8 character"),
    confirmPassword: Yup.string()
      .required("Enter confirm password")
      .min(8, "Password must be at least 8 character"),
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleValidSubmit(values, { setFieldError }) {
    let passwordError = false;
    if (values.newPassword !== values.confirmPassword) {
      setFieldError(
        "confirmPassword",
        "Confirm Password does not matched with new Password"
      );
      passwordError = true;
    }
    const data = {
      email: localStorage.getItem(STORAGEKEY.EMAIL),
      password_reset_otp: values.resetotp,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };
    if (!passwordError) {
      userResetPassword(data)
        .then((res) => {
          setTimeout(() => {
            notifySuccess("Password reset successfully");
          }, 100);
          props.history.push("/user-login");
        })
        .catch((err) => {
          const errorMessage =
            err && err.data && err.data.error && err.data.error.message;
          notifyError(notificationMessageFunction(errorMessage));

          // notifyError("Invalid Token please resend request");
        });
    }
  }

  const handleResentForgetPassword = () => {
    userForgotPassword({ email: localStorage.getItem(STORAGEKEY.EMAIL) })
      .then((res) => {
        notifySuccess(
          "Reset password email sent successfully, Kindly check your inbox."
        );
      })
      .catch((err) => {
        const errorMessage =
          err && err.data && err.data.error && err.data.error.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  };

  return (
    <React.Fragment>
      <div className="account-pages pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card-radius card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Reset Password</h5>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <div className="p-2">
                    <p className="mb-3">
                      You have requested to reset the password for email address{" "}
                      <b>{localStorage.getItem(STORAGEKEY.EMAIL)}</b>. Please
                      enter verification code received on this email to reset
                      password. Please look into spam folder too if you can’t
                      find code.
                    </p>

                    <Formik
                      initialValues={{
                        // email: "",
                        resetotp: "",
                        newPassword: "",
                        confirmPassword: "",
                      }}
                      validationSchema={resetPasswordSchema}
                      onSubmit={handleValidSubmit}
                    >
                      {({ errors, touched, values, handleChange }) => (
                        <Form>
                          <div className="mb-3">
                            <FormGroup>
                              <label htmlFor="email" className="">
                                {CONSTS.VERIFICATION_CODE}
                              </label>
                              <CustomInput
                                style={{ paddingRight: "30px" }}
                                type="text"
                                values={values}
                                placeholder="Enter verification code"
                                name="resetotp"
                                handleChange={(e) => handleChange(e)}
                                touched={touched}
                                errors={errors}
                                // iconName={"mdi mdi-email"}
                              />
                            </FormGroup>
                          </div>
                          <div className="mb-3">
                            <FormGroup>
                              <label htmlFor="email" className="">
                                {CONSTS.NEW_PASSWORD}
                              </label>
                              <div className="has-wrapper ">
                                <Input
                                  style={{ paddingRight: "30px" }}
                                  className={
                                    errors.newPassword ? "border-danger" : ""
                                  }
                                  type={showNewPassword ? "text" : "password"}
                                  value={values.newPassword}
                                  placeholder="Enter new password"
                                  name="newPassword"
                                  onChange={(e) => handleChange(e)}
                                />
                                <span
                                  className="has-icon"
                                  style={{ top: "4px" }}
                                >
                                  <i
                                    className={
                                      showNewPassword
                                        ? "mdi mdi-eye-outline"
                                        : "mdi mdi-eye-off"
                                    }
                                    onClick={() =>
                                      setShowNewPassword(!showNewPassword)
                                    }
                                  />
                                </span>
                                {errors.newPassword && touched.newPassword && (
                                  <div
                                    style={{ fontSize: 14 }}
                                    className="text-left mt-1 text-danger"
                                  >
                                    {errors.newPassword}
                                  </div>
                                )}
                              </div>
                            </FormGroup>
                          </div>
                          <div className="mb-3">
                            <FormGroup>
                              <label htmlFor="email" className="">
                                {CONSTS.CONFIRM_PASSWORD}
                              </label>
                              <div className="has-wrapper mb-20">
                                <Input
                                  style={{ paddingRight: "30px" }}
                                  className={
                                    errors.confirmPassword
                                      ? "border-danger"
                                      : ""
                                  }
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  value={values.confirmPassword}
                                  placeholder="Enter confirm password"
                                  name="confirmPassword"
                                  onChange={(e) => handleChange(e)}
                                />
                                <span
                                  className="has-icon"
                                  style={{ top: "4px" }}
                                >
                                  <i
                                    className={
                                      showConfirmPassword
                                        ? "mdi mdi-eye-outline"
                                        : "mdi mdi-eye-off"
                                    }
                                    onClick={() =>
                                      setShowConfirmPassword(
                                        !showConfirmPassword
                                      )
                                    }
                                  />
                                </span>
                                {errors.confirmPassword &&
                                  touched.confirmPassword && (
                                    <div
                                      style={{ fontSize: 14 }}
                                      className="text-left mt-1 text-danger"
                                    >
                                      {errors.confirmPassword}
                                    </div>
                                  )}
                              </div>
                            </FormGroup>
                          </div>
                          <div className="mb-3 text-center w-100 waves-effect waves-light">
                            <Button
                              type="submit"
                              style={{ width: "100px", borderRadius: "8px" }}
                              name="btn"
                              className="btn btn-primary "
                              color="primary"
                              onSubmit={(values) => handleValidSubmit(values)}
                            >
                              Reset
                            </Button>
                          </div>

                          <div
                            style={{
                              justifyContent: "center",
                              display: "flex",
                            }}
                          >
                            Didn’t get a code?
                            <label
                              onClick={handleResentForgetPassword}
                              className="fw-medium text-primary"
                              style={{ cursor: "pointer" }}
                            >
                              &nbsp; &nbsp;Resend code
                            </label>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Remember It?
                  <Link to="/user-login" className="fw-medium text-primary">
                    &nbsp; Sign in here
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

export default ResetPassword;
