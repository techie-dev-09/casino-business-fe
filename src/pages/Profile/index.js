import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import Spinner from "../../components/Common/CustomLoader/loader";

import avatar2 from "../../assets/images/users/user.jpg";

import { Formik, Form } from "formik";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { notificationMessageFunction } from "../../constants/notificationConst";
import { errorConst as ERR_SUCC_CONSTS } from "../../constants/errorSuccessConstants";
import { placeholderConst as PLACEHOLDER_CONSTS } from "../../constants/placeholderConsts";
import {
  UploadProfileApi,
  getUserAccount,
  updateProfile,
} from "../../services/accountService";

const Profile = () => {
  let initialValue = {
    abbrev: "GMT",
    altName: "ETC/GMT",
    label: "(GMT+0:00) UTC",
    offset: 0,
    value: "Etc/GMT",
  };
  const [selectedTimezone, setSelectedTimezone] = useState(initialValue);
  const [profileData, setProfileData] = useState({
    company_name: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profile, setProfile] = useState("");
  const [buttonHide, setButtonHide] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  const startLoading = () => {
    setIsLoading(true);
  };
  const stopLoading = () => {
    setIsLoading(false);
  };

  const getUserAccountFunc = () => {
    getUserAccount()
      .then((res) => {
        if (res && res.data && res.data.data.data) {
          const userData = res.data.data.data;
          setProfileData({
            company_name: userData.company_name,
            email: userData.email,
          });
          setSelectedTimezone(userData.timezone);
          setProfile(userData.profile_image ? userData.profile_image : null);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUserAccountFunc();
  }, []);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|jfif)$/)) {
      setButtonHide(true);
    } else {
      setProfileImage(e.target.files[0]);
      setButtonHide(false);
    }
  };

  console.log("----------values-----------", buttonHide);
  const handleUpdateProfile = (values, { setFieldError, resetForm }) => {
    let passwordError = false;
    let data = new FormData();

    if (values.company_name.trim().length < 2) {
      setFieldError("company_name", ERR_SUCC_CONSTS.COMPANY_NAME);
      passwordError = true;
    }

    data.append("company_name", values.company_name);

    if (values.oldPassword) {
      if (!values.newPassword) {
        setFieldError("newPassword", ERR_SUCC_CONSTS.NEW_PASSWORD_REQUIRED);
        passwordError = true;
      }
      if (!values.confirmPassword) {
        setFieldError(
          "confirmPassword",
          ERR_SUCC_CONSTS.CONFIRM_PASSWORD_REQUIRED
        );
        passwordError = true;
      }
    }

    if (values.newPassword) {
      if (!values.oldPassword) {
        setFieldError("oldPassword", ERR_SUCC_CONSTS.OLD_PASSWORD_REQUIRED);
        passwordError = true;
      }
      if (!values.confirmPassword) {
        setFieldError(
          "confirmPassword",
          ERR_SUCC_CONSTS.CONFIRM_PASSWORD_REQUIRED
        );
        passwordError = true;
      }
    }

    if (values.confirmPassword) {
      if (!values.oldPassword) {
        setFieldError("oldPassword", ERR_SUCC_CONSTS.OLD_PASSWORD_REQUIRED);
        passwordError = true;
      }
      if (!values.newPassword) {
        setFieldError("newPassword", ERR_SUCC_CONSTS.NEW_PASSWORD_REQUIRED);
        passwordError = true;
      }
    }

    if (values.oldPassword && values.newPassword && values.confirmPassword) {
      if (values.newPassword.length < 8) {
        setFieldError("newPassword", ERR_SUCC_CONSTS.PASSWORD_LENGTH);
        passwordError = true;
      }
      if (!values.newPassword.match(/^\S*$/)) {
        setFieldError("newPassword", "space is not allowed");
        passwordError = true;
      }
      if (values.oldPassword.length < 8) {
        setFieldError("oldPassword", ERR_SUCC_CONSTS.PASSWORD_LENGTH);
        passwordError = true;
      }
      if (!values.oldPassword.match(/^\S*$/)) {
        setFieldError("oldPassword", "space is not allowed");
        passwordError = true;
      }
      if (values.confirmPassword.length < 8) {
        setFieldError("confirmPassword", ERR_SUCC_CONSTS.PASSWORD_LENGTH);
        passwordError = true;
      }
      if (!values.confirmPassword.match(/^\S*$/)) {
        setFieldError("confirmPassword", "space is not allowed");
        passwordError = true;
      }
      if (values.newPassword === values.oldPassword) {
        setFieldError("newPassword", ERR_SUCC_CONSTS.NEW_PASSWORD);
        passwordError = true;
      }

      if (values.confirmPassword !== values.newPassword) {
        setFieldError(
          "confirmPassword",
          ERR_SUCC_CONSTS.CONFIRM_PASSWORD_NOT_MATCH
        );
        passwordError = true;
      }
      data.append("oldPassword", values.oldPassword);
      data.append("newPassword", values.newPassword);
      data.append("confirmPassword", values.confirmPassword);
    }
    data.append("timezone", JSON.stringify(selectedTimezone));

    if (!passwordError) {
      startLoading();
      updateProfile(data)
        .then((res) => {
          notifySuccess(ERR_SUCC_CONSTS.PROFILE_UPDATED);
          resetForm();
          getUserAccountFunc();
          data.append("profile_image", profile);
          if (profileImage !== "") {
            data.append("profile_image", profileImage);
          }
          UploadProfileApi(data)
            .then((res) => {
              getUserAccountFunc();
              window.location.reload(true);
            })
            .catch((err) => {
              stopLoading();
            });
          stopLoading();
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
      <div className="page-content">
        <Breadcrumbs
          title="Web"
          breadcrumbItem="Profile"
          to="/user-dashboard"
        />
        <Row>
          <Col lg={6} md={12} sm={12}>
            <Card style={{ marginLeft: 60, height: "100%" }}>
              {isLoading && <Spinner />}
              <CardBody>
                <Row>
                  <Col>
                    <div>
                      <img
                        className="mr-1 border-2 mt-1 shadow-lg p-1 mb-2 bg-white rounded"
                        src={
                          profile !== null && profile !== "" ? profile : avatar2
                        }
                        alt="Profile Avatar"
                        height="110"
                        width="115"
                      />

                      <label
                        htmlFor="profile"
                        style={{
                          position: "absolute",
                          left: "8em",
                        }}
                      >
                        <span
                          className="mdi mdi-pencil shadow-lg p-1 mb-2 bg-white rounded-circle"
                          style={{
                            color: "#134a87",
                            fontSize: 15,
                            cursor: "pointer",
                          }}
                        ></span>
                      </label>
                      <Input
                        type="file"
                        id="profile"
                        name="profile"
                        style={{ display: "none" }}
                        onChange={imageHandler}
                        accept="image/*"
                      />
                    </div>
                    <ul className="list-unstyled my-40 mb-0 mt-4">
                      <li className="border-bottom py-15 d-flex align-items-center">
                        <i
                          className="mdi mdi-account font-size-20"
                          style={{ fontSize: "24" }}
                        ></i>
                        <span style={{ color: "black", marginLeft: "10px" }}>
                          {profileData.company_name}
                        </span>
                      </li>
                      <li className="border-bottom py-15 d-flex align-items-center mt-3">
                        <i
                          className="mdi mdi-email font-size-20"
                          style={{ fontSize: "24" }}
                        ></i>
                        <span style={{ color: "black", marginLeft: "10px" }}>
                          {profileData.email}
                        </span>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6} md={12} sm={12}>
            <Card style={{ height: "100%" }}>
              <CardTitle
                style={{
                  margin: "10px 20px 0px 20px",
                  fontSize: 15,
                }}
              >
                Update Profile
              </CardTitle>
              <CardBody>
                <Row>
                  <Col>
                    <div>
                      <Formik
                        enableReinitialize
                        initialValues={{
                          company_name: profileData.company_name,
                          oldPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        }}
                        onSubmit={handleUpdateProfile}
                      >
                        {({ errors, touched, values, handleChange }) => (
                          <Form>
                            <Row>
                              <Col xl={12}>
                                <FormGroup>
                                  <label htmlFor="company_name" className="">
                                    Company Name
                                  </label>
                                  <Input
                                    type="text"
                                    value={values.company_name}
                                    placeholder={
                                      PLACEHOLDER_CONSTS.ENTER_FIRST_NAME
                                    }
                                    name="company_name"
                                    className={
                                      errors.company_name &&
                                      touched.company_name
                                        ? "mb-1  border-danger"
                                        : "mb-1"
                                    }
                                    onChange={(e) => handleChange(e)}
                                  />
                                  {errors.company_name &&
                                    touched.company_name && (
                                      <div
                                        style={{ fontSize: 14 }}
                                        className="text-left mt-1 text-danger"
                                      >
                                        {errors.company_name}
                                      </div>
                                    )}
                                </FormGroup>
                              </Col>
                            </Row>

                            <Col xl={12}>
                              <div className="mb-3">
                                <FormGroup>
                                  <label htmlFor="oldPassword" className="">
                                    Old password
                                  </label>
                                  <div className="has-wrapper mb-20">
                                    <Input
                                      style={{ paddingRight: "30px" }}
                                      className={
                                        errors.oldPassword
                                          ? "  border-danger"
                                          : ""
                                      }
                                      type={
                                        showOldPassword ? "text" : "password"
                                      }
                                      value={values.oldPassword}
                                      placeholder={
                                        PLACEHOLDER_CONSTS.ENTER_OLD_PASSWORD
                                      }
                                      name="oldPassword"
                                      onChange={(e) => handleChange(e)}
                                    />
                                    <span
                                      className="has-icon"
                                      style={{ top: "4px" }}
                                    >
                                      <i
                                        className={
                                          showOldPassword
                                            ? "mdi mdi-eye-outline"
                                            : "mdi mdi-eye-off"
                                        }
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          setShowOldPassword(!showOldPassword)
                                        }
                                      />
                                    </span>
                                    {errors.oldPassword &&
                                      touched.oldPassword && (
                                        <div
                                          style={{ fontSize: 14 }}
                                          className="text-left mt-1 text-danger"
                                        >
                                          {errors.oldPassword}
                                        </div>
                                      )}
                                  </div>
                                </FormGroup>
                              </div>
                            </Col>

                            <Col xl={12}>
                              <div className="mb-3">
                                <FormGroup>
                                  <label htmlFor="email" className="">
                                    New password
                                  </label>
                                  <div className="has-wrapper mb-20">
                                    <Input
                                      style={{ paddingRight: "30px" }}
                                      className={
                                        errors.newPassword
                                          ? "border-danger"
                                          : ""
                                      }
                                      type={
                                        showNewPassword ? "text" : "password"
                                      }
                                      value={values.newPassword}
                                      placeholder={
                                        PLACEHOLDER_CONSTS.ENTER_NEW_PASSWORD
                                      }
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
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          setShowNewPassword(!showNewPassword)
                                        }
                                      />
                                    </span>
                                    {errors.newPassword &&
                                      touched.newPassword && (
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
                            </Col>

                            <Col xl={12}>
                              <div className="mb-3">
                                <FormGroup>
                                  <label htmlFor="email" className="">
                                    Confirm password
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
                                        showConfirmPassword
                                          ? "text"
                                          : "password"
                                      }
                                      value={values.confirmPassword}
                                      placeholder={
                                        PLACEHOLDER_CONSTS.ENTER_CONFIRM_PASSWORD
                                      }
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
                                        style={{ cursor: "pointer" }}
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
                            </Col>
                            <Button
                              type="submit"
                              style={{ width: "100px", borderRadius: "8px" }}
                              name="btn"
                              className="btn btn-primary font-size-14"
                              color="primary"
                              onSubmit={handleUpdateProfile}
                            >
                              Save
                            </Button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <NotificationToastContainer />
    </React.Fragment>
  );
};

export default Profile;
