import React from "react";
import { ModalTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CustomButton from "../../components/Custom/Button";

const Redirect = (modal, handleClose) => {
  return (
    <>
      <Modal isOpen={modal} centered={true}>
        <ModalHeader
          toggle={handleClose}
          style={{
            borderBottom: "none",
            textAlign: "center",
            paddingLeft: "30%",
            paddingBottom: "0%",
          }}
        >
          <ModalTitle>
            <b>Account Not Found</b>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <span className="font-size-12">
            We do not have a registered account under your name. Would you like
            to create one by signing up now?
          </span>
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <CustomButton
              type="button"
              name="btn"
              className="custombtn"
              color="primary"
            >
              <Link
                to="/user-register"
                style={{ color: "white", textAlign: "center" }}
              >
                Register
              </Link>
            </CustomButton>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};
export default Redirect;
