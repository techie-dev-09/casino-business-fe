import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import { authResendCode, getUserAccount } from "../../services/accountService";
import VerifyAccount from "./VerifyAccount";
import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";

import { notificationMessageFunction } from "../../constants/notificationConst";

function VerificationWarning() {
  const [userData, setUserData] = useState({});
  const [isShown, setIsShown] = useState(false);
  const openDynamicModal = () => {
    setIsShown(true);
    resendCode();
  };
  const closeDynamicModal = () => {
    setIsShown(false);
  };
  const handleVerified = () => {};
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
  const getUserAccountFunc = () => {
    getUserAccount()
      .then((res) => {
        if (res && res.data && res.data.data.data) {
          const userData = res.data.data.data;

          setUserData(userData);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUserAccountFunc();
  }, []);

  return (
    <div className="">
      {Object.keys(userData).length > 0 &&
        (userData.status === 0 || userData.status === 4) && (
          <Alert style={{ marginLeft: 70 }} color="info">
            Please verify your email address by entering verification code in
            the email we sent to {userData.email} &nbsp;
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" onClick={openDynamicModal}>
              Verify now
            </a>
            {VerifyAccount(
              isShown,
              closeDynamicModal,
              getUserAccountFunc,
              handleVerified
            )}
          </Alert>
        )}
      <NotificationToastContainer />
    </div>
  );
}

export default VerificationWarning;
