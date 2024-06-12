import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";
import { getUserAccount } from "../../services/accountService";
import user4 from "../../assets/images/users/user.png";

const Sidebar = (props) => {
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
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="h-100">
          <div className="user-wid text-center py-4">
            {profile !== "" && profile !== null && (
              <div className="user-img">
                <img
                  src={profile !== null && profile !== "" ? profile : user4}
                  alt=""
                  className="avatar-md mx-auto rounded-circle"
                />
              </div>
            )}

            <div className="mt-3" style={{ wordBreak: "break-word" }}>
              <Link to="#" className="text-dark fw-medium font-size-16">
                {userData.company_name}
              </Link>
            </div>
          </div>
          <div data-simplebar className="h-100">
            <SidebarContent />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = (state) => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
