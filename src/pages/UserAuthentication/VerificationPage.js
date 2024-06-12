import React from "react";
import { Button, Col, Container, FormGroup, Input, Row } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { STORAGEKEY } from "../../components/Constant";

import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import { AuthVerifyEmail, authResendCode } from "../../services/accountService";
import { notificationMessageFunction } from "../../constants/notificationConst";

function VerificationPage(props) {
  let { show_later } = props.location.state;
  const verificationSchema = Yup.object().shape({
    otp: Yup.string()
      .trim()
      .required("Please enter verification code")
      .matches(/^\S*$/, "space is not allowed"),
  });

  let verificationApiFunction = (data) => {
    AuthVerifyEmail(data)
      .then((res) => {
        if (res.data.data.message === "succ_5") {
          setTimeout(() => {
            notifySuccess("Your account is already verified");
          }, 100);
        }

        if (
          res.data.data.message === "succ_0" &&
          res.data.data.data.status !== 4
        ) {
          setTimeout(() => {
            notifySuccess("Your account verified successfully");
          }, 100);
        }
        const data = res && res.data && res.data.data && res.data.data.data;
        localStorage.setItem(STORAGEKEY.ACCESSTOKEN, data.accessToken);
        localStorage.setItem(STORAGEKEY.EMAIL, data.email);
        props.history.push("/user-dashboard");
      })
      .catch((err) => {
        console.log({ err });
        const errorMessage = err?.data?.error?.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  };

  const handleSubmit = (values, { resetForm }) => {
    const data = {
      email: localStorage.getItem(STORAGEKEY.EMAIL).toLowerCase(),
      otp: values.otp,
    };
    verificationApiFunction(data);
  };

  const resendCode = () => {
    const data = {
      email: localStorage.getItem("EMAIL"),
    };
    authResendCode(data)
      .then((res) => {
        notifySuccess("Verify email sent successfully to your email");
      })
      .catch((err) => {
        const errorMessage = err.data.error.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  };

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={6} xl={6}>
              <div className="card-radius card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">
                      Verify Your Account
                    </h5>
                  </div>
                </div>
                <div className="card-body pt-4 mt-4">
                  {show_later && (
                    <p style={{ padding: 5 }}>
                      <b>{localStorage.getItem(STORAGEKEY.EMAIL)}</b>, We have
                      sent you a verification code to this email address. Please
                      check your inbox.
                    </p>
                  )}

                  <div className="p-2">
                    <Formik
                      initialValues={{
                        otp: "",
                      }}
                      validationSchema={verificationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched, values, handleChange }) => (
                        <Form>
                          <div className="mb-3">
                            <FormGroup>
                              <label htmlFor="email" className="">
                                Verification code
                              </label>
                              <div className="has-wrapper">
                                <Input
                                  style={{ paddingRight: "30px" }}
                                  className={
                                    errors.otp && touched.otp
                                      ? "border-danger"
                                      : ""
                                  }
                                  type="text"
                                  value={values.otp}
                                  placeholder="Enter verification code"
                                  name="otp"
                                  onChange={(e) => handleChange(e)}
                                />

                                {errors.otp && touched.otp && (
                                  <div
                                    style={{ fontSize: 14 }}
                                    className="text-left mt-1 text-danger"
                                  >
                                    {errors.otp}
                                  </div>
                                )}
                              </div>
                            </FormGroup>
                          </div>
                          <div className="mb-3 text-center w-100 waves-effect waves-light">
                            <Button
                              type="submit"
                              name="btn"
                              className="btn btn-primary "
                              color="primary"
                              style={{ width: "100px", borderRadius: "8px" }}
                              onSubmit={(values) => handleSubmit(values)}
                            >
                              Verify now
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
                              onClick={resendCode}
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
              <Row>
                <Col>
                  <div className="text-center">
                    Copyright © {new Date().getFullYear()}{" "}
                    <a
                      href="https://fo1buy.io/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <b>1buy.io.</b>
                    </a>{" "}
                    All rights reserved
                  </div>
                </Col>
              </Row>
              {/* <div className="mt-5 text-center">
                <p>
                  Don't have an account?
                  <Link to="/user-login" className="fw-medium text-primary">
                    &nbsp;Login
                  </Link>
                </p>
              </div> */}
            </Col>
          </Row>
        </Container>
        <NotificationToastContainer />
      </div>
    </React.Fragment>
  );
}

export default VerificationPage;
