import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SweetAlert from "react-bootstrap-sweetalert";

// users
import user4 from "../../../assets/images/users/user.png";
import { getUserAccount } from "../../../services/accountService";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const [logoutModal, setlogoutModal] = useState(false);

  const logout = () => {
    localStorage.clear();
    props.history.push("/user-login");
  };
  const [profile, setProfile] = useState("");
  const [userData, setUserData] = useState({});

  const getUserAccountFunc = () => {
    getUserAccount()
      .then((res) => {
        if (res && res.data && res.data.data.data) {
          const userData = res.data.data.data;
          setUserData(userData);
          setProfile(userData.profile_image);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUserAccountFunc();
  }, []);
  const sweetAlertFuction = () => {
    return (
      <SweetAlert
        title="Are you sure you want to logout?"
        danger
        showCancel
        confirmBtnText="Logout"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="success"
        onConfirm={logout}
        onCancel={() => setlogoutModal(false)}
      />
    );
  };

  let username = "";

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={profile !== null && profile !== "" ? profile : user4}
            alt="profile"
          />
          <span className="d-none d-xl-inline-block ms-1">{username}</span>{" "}
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>{" "}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem
            className="dropdown-item text-danger"
            onClick={() => setlogoutModal(!logoutModal)}
          >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>{" "}
            <label>{"Logout"}</label>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {logoutModal ? sweetAlertFuction() : null}
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};

const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
