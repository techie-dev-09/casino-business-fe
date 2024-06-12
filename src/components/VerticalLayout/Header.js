import PropTypes from "prop-types";
import React, { useState } from "react";

import { connect } from "react-redux";
import { Alert, Container } from "reactstrap";

import { Link } from "react-router-dom";

// Reactstrap
import { Dropdown } from "reactstrap";

// Import menuDropdown
// import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";

import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import logoSm from "../../assets/images/logo-sm.png";
// import logoDark from "../../assets/images/logo-dark.png";
// import alert from "../../assets/images/alert.png";
// import logoLight from "../../assets/images/logo-dark.png";

//i18n
import { withTranslation } from "react-i18next";

// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import { STORAGEKEY } from "../Constant";

const Header = (props) => {
  const [afterLoginText, setAfterLoginText] = useState(true);
  const role = localStorage.getItem(STORAGEKEY.ROLE);

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 768) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <div className="layout-overlay"></div>
      <header id="page-topbar">
        <div className="navbar-header">
          <Container fluid>
            <div className="float-end">
              <Dropdown className="d-none d-lg-inline-block ms-1">
                <button
                  type="button"
                  onClick={() => {
                    toggleFullscreen();
                  }}
                  className="btn header-item noti-icon waves-effect"
                  data-toggle="fullscreen"
                >
                  <i className="mdi mdi-fullscreen"></i>
                </button>
              </Dropdown>{" "}
              <ProfileMenu />{" "}
            </div>
            <div>
              <div
                className="navbar-brand-box"
                style={{ marginLeft: "25px", marginTop: "2px" }}
              >
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    {/* <img src={logoSm} alt="" height="20" /> */}
                  </span>
                  <span className="logo-lg">
                    {/* <img src={logoDark} alt="" height="19" /> */}
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    {/* <img src={logoSm} alt="" height="20" /> */}
                  </span>
                  <span className="logo-lg">
                    {/* <img src={logoLight} alt="" height="50" /> */}
                  </span>
                </Link>
              </div>
              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                data-toggle="collapse"
                onClick={() => {
                  tToggle();
                }}
                data-target="#topnav-menu-content"
              >
                <i className="fa fa-fw fa-bars"></i>
              </button>
            </div>
          </Container>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
  changeSidebarType: PropTypes.func,
  leftMenu: PropTypes.any,
  leftSideBarType: PropTypes.any,
  showRightSidebar: PropTypes.any,
  showRightSidebarAction: PropTypes.func,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
