import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Input,
  Alert,
  FormGroup,
} from "reactstrap";

import { Link } from "react-router-dom";
import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { userForgotPassword } from "../../services/authService";

import { STORAGEKEY } from "../../components/Constant";
import { notificationMessageFunction } from "../../constants/notificationConst";

const ForgetPasswordPage = (props) => {
  const [supportText, setSupportText] = useState(true);
  const [supportTextData, setSupportTextData] = useState({});

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter valid email address")
      .required("Please enter email address"),
  });

  function handleValidSubmit(values) {
    userForgotPassword({ email: values.email.toLowerCase() })
      .then((res) => {
        setTimeout(() => {
          notifySuccess(
            "Reset password email sent successfully, Kindly check your inbox."
          );
        }, 100);
        localStorage.setItem(STORAGEKEY.EMAIL, values.email.toLowerCase());
        props.history.push("/reset-password");
      })
      .catch((err) => {
        const errorMessage =
          err && err.data && err.data.error && err.data.error.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  }

  return (
    <React.Fragment>
      <div className="account-pages pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              {Object.keys(supportTextData).length !== 0 &&
                supportTextData.status === 1 && (
                  <Alert
                    color="info"
                    isOpen={supportText}
                    toggle={() => setSupportText(!supportText)}
                  >
                    <h6 style={{ textAlign: "left", wordBreak: "break-word" }}>
                      {supportTextData.support_text}
                    </h6>
                  </Alert>
                )}
              {/* <Alert
                color="info"
                isOpen={supportText}
                toggle={() => setSupportText(!supportText)}
              >
                <h6 style={{ textAlign: "left", wordBreak: "break-word" }}>
                  Our servers are under maintenance & upgradation is under
                  process.
                </h6>
              </Alert> */}

              <div className="card-radius card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Reset Password</h5>
                    <p className="text-white mb-0">Re-Password with 1buy.io.</p>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <div className="p-2">
                    <Formik
                      initialValues={{ email: "" }}
                      validationSchema={forgetPasswordSchema}
                      onSubmit={handleValidSubmit}
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
                                  style={{ paddingRight: "30px" }}
                                  className={
                                    errors.email ? "border-danger" : ""
                                  }
                                  type="text"
                                  value={values.email}
                                  placeholder="Enter email"
                                  name="email"
                                  onChange={(e) => handleChange(e)}
                                />
                                <span
                                  className="has-icon"
                                  style={{ top: "4px" }}
                                >
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
                          <div className="text-center w-100 waves-effect waves-light">
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
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link to="/user-login" className="fw-medium text-primary">
                    {" "}
                    Sign In here
                  </Link>{" "}
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

export default ForgetPasswordPage;
