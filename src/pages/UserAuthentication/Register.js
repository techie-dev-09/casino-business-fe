import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Container,
  Button,
  Input,
  Alert,
  Label,
} from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// availity-reactstrap-validation
import { Link } from "react-router-dom";
import { userAuthRegister } from "../../services/authService";
// import images
import CustomInput from "../../components/Custom/textinput";
import { STORAGEKEY } from "../../components/Constant";
import CustomLoader from "../../components/Common/CustomLoader/loader";
import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import { notificationMessageFunction } from "../../constants/notificationConst";

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsDataLoading] = useState(false);

  const RegisterSchema = Yup.object().shape({
    company_name: Yup.string()
      .trim()
      .required("Enter company name")
      .min(2, "Company name length must be greater than 1 character")
      .max(25, "Company name length must be less than 25 characters"),

    email: Yup.string()
      .email("Enter valid email address")
      .required("Please enter email address"),
    password: Yup.string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 character")
      .matches(/^\S*$/, "space is not allowed"),
    confirmPassword: Yup.string()
      .required("Enter confirm password")
      .min(8, "Password must be at least 8 character")
      .matches(/^\S*$/, "space is not allowed"),
  });

  const startLoading = () => {
    setIsDataLoading(true);
  };
  const stopLoading = () => {
    setIsDataLoading(false);
  };

  const handleValidSubmit = (values, { setFieldError }) => {
    let passwordError = false;
    const data = {
      company_name: values.company_name,
      email: values.email.toLowerCase(),
      password: values.password,
      confirm_password: values.confirmPassword,
    };

    if (values.password !== values.confirmPassword) {
      setFieldError(
        "confirmPassword",
        "Confirm Password does not matched with new password"
      );
      passwordError = true;
    }
    if (!passwordError) {
      startLoading();
      userAuthRegister(data)
        .then((res) => {
          setTimeout(() => {
            notifySuccess("Your email is registered successfully");
          }, 100);
          localStorage.setItem(STORAGEKEY.EMAIL, data.email);
          // props.history.push("/verify-account");
          props.history.push({
            pathname: "/verify-account",
            state: { show_later: true },
          });
        })
        .catch((err) => {
          stopLoading();
          const errorMessage = err.data.error.message;
          notifyError(notificationMessageFunction(errorMessage));
        });
    }
  };

  return (
    <React.Fragment>
      <div className="account-pages pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              {isLoading && <CustomLoader />}

              <Card className="card-radius overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Register</h5>
                    <p className="text-white mb-0">Get your 1buy account now</p>
                  </div>
                </div>
                <div className="card-body pt-4">
                  <div className="p-2">
                    <Formik
                      initialValues={{
                        company_name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                      }}
                      validationSchema={RegisterSchema}
                      onSubmit={handleValidSubmit}
                    >
                      {({ errors, touched, values, handleChange }) => (
                        <Form>
                          <Col>
                            <div className="has-wrapper mb-10">
                              <Label className="mb-0">Company name</Label>
                              <CustomInput
                                style={{
                                  paddingRight: "30px",
                                }}
                                type="text"
                                values={values}
                                placeholder="Enter company name"
                                name="company_name"
                                // className="mt-2"
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                iconName={"mdi mdi-account"}
                              />
                            </div>
                          </Col>
                          <Col>
                            <div
                              className="has-wrapper mb-10"
                              style={{ marginTop: 10 }}
                            >
                              <Label className="mb-0"> Email</Label>

                              <CustomInput
                                style={{ paddingRight: "30px" }}
                                type="text"
                                values={values}
                                placeholder="Enter email"
                                name="email"
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                iconName={"mdi mdi-email"}
                              />
                            </div>
                          </Col>

                          <Col>
                            <div
                              className="has-wrapper mb-10"
                              style={{ marginTop: 10 }}
                            >
                              <Label className="mb-0"> Password</Label>

                              <Input
                                style={{ paddingRight: "30px" }}
                                className={
                                  errors.password && touched.password
                                    ? "mt-2  border-danger"
                                    : "mt-2"
                                }
                                type={showPassword ? "text" : "password"}
                                value={values.password}
                                placeholder="Enter password"
                                name="password"
                                onChange={(e) => handleChange(e)}
                              />
                              <span
                                className="has-icon"
                                style={{ top: "35px" }}
                              >
                                <i
                                  className={
                                    showPassword
                                      ? "mdi mdi-eye-outline"
                                      : "mdi mdi-eye-off"
                                  }
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setShowPassword(!showPassword)}
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
                          </Col>
                          <Col>
                            <div
                              className="has-wrapper mb-10"
                              style={{ marginTop: 10 }}
                            >
                              <Label className="mb-0"> Confirm password</Label>

                              <Input
                                style={{ paddingRight: "30px" }}
                                className={
                                  errors.confirmPassword &&
                                  touched.confirmPassword
                                    ? "mt-2  border-danger"
                                    : "mt-2"
                                }
                                type={showConfirmPassword ? "text" : "password"}
                                value={values.confirmPassword}
                                placeholder="Enter confirm password"
                                name="confirmPassword"
                                onChange={(e) => handleChange(e)}
                              />
                              <span
                                className="has-icon"
                                style={{ top: "35px" }}
                              >
                                <i
                                  className={
                                    showConfirmPassword
                                      ? "mdi mdi-eye-outline"
                                      : "mdi mdi-eye-off"
                                  }
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
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
                          </Col>

                          <div className="mt-2 text-center w-100 waves-effect waves-light">
                            <Button
                              type="submit"
                              name="btn"
                              className="btn btn-primary "
                              style={{ width: "100px", borderRadius: "8px" }}
                              color="primary"
                              onSubmit={(values) => handleValidSubmit(values)}
                            >
                              {"Register"}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </Card>
              <div className="mt-2 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/user-login" className="fw-medium text-primary">
                    Login
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
      </div>
      <NotificationToastContainer />
    </React.Fragment>
  );
};

export default Register;
