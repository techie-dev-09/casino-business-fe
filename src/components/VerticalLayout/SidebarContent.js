import PropTypes from "prop-types";
import React, { useEffect, useRef, useCallback, useState } from "react";
import { STORAGEKEY } from "../Constant";
import SimpleBar from "simplebar-react";
// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = (props) => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item && item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }
    if (parent && parent.classList) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;
      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag
        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;
    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname, activateParentDropdown]);
  useEffect(() => {
    ref.current.recalculate();
  }, []);
  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  };

  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Dashboard")} </li>
            <li>
              <Link to="/user-dashboard" className="waves-effect">
                <i className="mdi mdi-view-dashboard"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("Goods Details")}</li>
            <li>
              <Link to="/api-key" className="waves-effect">
                <i className="mdi mdi-key"></i>
                <span>{props.t("API KEY")}</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="waves-effect">
                <i className="mdi mdi-creation"></i>
                <span>{props.t("Products")}</span>
              </Link>
            </li>

            <li className="menu-title">{props.t("Monitor")}</li>
            <li>
              <Link to="/transactions" className="waves-effect">
                <i className="mdi mdi-format-list-bulleted"></i>
                <span>{props.t("Transactions")}</span>
              </Link>
            </li>
            <li>
              <Link to="/widget-webhook" className="waves-effect">
                <i className="mdi mdi-webhook"></i>
                <span>{props.t("Webhook")}</span>
              </Link>
            </li>
            <li className="menu-title">{props.t("User Settings")}</li>
            <li>
              <Link to="/user-profile" className="waves-effect">
                <i className="mdi mdi-human-greeting"></i>
                <span>{props.t("Profile")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
