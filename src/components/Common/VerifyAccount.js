import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button, FormGroup, Input } from "reactstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { STORAGEKEY } from "../Constant";
import { authResendCode, AuthVerifyEmail } from "../../services/accountService";
import {
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import { notificationMessageFunction } from "../../constants/notificationConst";

function VerifyAccount(
  isShown,
  closeDynamicModal,
  getUserAccountFunc,
  handleVerified
) {
  const verificationSchema = Yup.object().shape({
    otp: Yup.string()
      .trim()
      .required("Please enter verification code")
      .matches(/^\S*$/, "space is not allowed"),
  });
  let verificationApiFunction = (data) => {
    AuthVerifyEmail(data)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        localStorage.setItem(STORAGEKEY.ACCESSTOKEN, data.accessToken);
        localStorage.setItem(STORAGEKEY.ROLE, data.role);
        localStorage.setItem(STORAGEKEY.EMAIL, data.email);
        localStorage.setItem(STORAGEKEY.NEW_FEATURE_ALERT, true);
        getUserAccountFunc();

        if (res.data.data.message === "succ_0") {
          handleVerified();
          closeDynamicModal();

          notifySuccess("Your account verified successfully");
        }
      })
      .catch((err) => {
        const errorMessage = err.data.error.message;
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
        notifySuccess("Verify email sent successfully to your email", "", 700);
      })
      .catch((err) => {
        const errorMessage = err.data.error.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  };

  return (
    <React.Fragment>
      <Modal
        isOpen={isShown}
        centered={true}
        // style={{ maxWidth: "20%", width: "100%" }}
      >
        <ModalHeader toggle={() => closeDynamicModal()}>
          Verify Account
        </ModalHeader>
        <ModalBody>
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
                          errors.otp && touched.otp ? "border-danger" : ""
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
                <div
                  className="mb-3 text-center w-100 waves-effect waves-light"
                  style={{ width: "20%" }}
                >
                  <Button
                    type="submit"
                    name="btn"
                    className="btn btn-primary "
                    color="primary"
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
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default VerifyAccount;
