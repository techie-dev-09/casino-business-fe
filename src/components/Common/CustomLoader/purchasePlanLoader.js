import React from "react";
import { Spinner } from "react-bootstrap";
import "./spinner.scss";

const purchasePlanLoader = () => {
    return (
      <React.Fragment>
        <div className="loader1">
          <Spinner animation="border" />
        </div>
      </React.Fragment>
    );
  }

  export default purchasePlanLoader;