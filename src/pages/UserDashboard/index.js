/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { STORAGEKEY } from "../../components/Constant";
import { constants as CONSTS } from "../../constants/constants";
import ape from "../../assets/images/ape.png";
import cardImage from "../../assets/images/card.png";
import dollar from "../../assets/images/dollar.png";
import { DashboardAPI, getUserAccount } from "../../services/accountService";
import { Card, CardTitle, Col, Row } from "reactstrap";

const DashboardIndex = () => {
  const [dashboardData, setDashboardData] = useState(null);
  useEffect(() => {
    if (
      localStorage.getItem(STORAGEKEY.ACCESSTOKEN) !== null &&
      localStorage.getItem(STORAGEKEY.ACCESSTOKEN) !== undefined
    ) {
      getUserAccount()
        .then((res) => {
          if (res && res.data && res.data.data.data) {
            const userData = res.data.data.data;
            localStorage.setItem(
              STORAGEKEY.FULL_NAME,
              `${userData.firstname} ${userData.lastname}`
            );
          }
        })
        .catch((err) => {});
    }
  }, [
    localStorage.getItem(STORAGEKEY.ACCESSTOKEN),
    localStorage.getItem(STORAGEKEY.EMAIL),
    localStorage.getItem(STORAGEKEY.FULL_NAME),
  ]);
  const dashboardAPIFunction = () => {
    DashboardAPI()
      .then((res) => {
        setDashboardData(res.data.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    dashboardAPIFunction();
  }, []);

  console.log("----------------", dashboardData);

  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Col className="col-12">
            <div className="page-title-box d-flex align-items-start align-items-center justify-content-between">
              <h4
                className="page-title mb-0 font-size-18"
                style={{ marginLeft: 70 }}
              >
                {CONSTS.ONLY_DASHBOARD}
              </h4>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 60,
          }}
        >
          <Col lg={4}>
            <CommonCardFunction
              countsFor={formatNumber(
                dashboardData ? dashboardData.todaysOrders : 0
              )}
              cardFor={CONSTS.TODAYS_ORDERS}
              image={ape}
            />
          </Col>
          <Col lg={4}>
            <CommonCardFunction
              countsFor={formatNumber(
                dashboardData && dashboardData.totalOrders
                  ? dashboardData.totalOrders
                  : 0
              )}
              cardFor={CONSTS.TOTAL_ORDERS}
              image={cardImage}
            />
          </Col>
          <Col lg={4}></Col>
          <Col lg={4}>
            <CommonCardFunction
              countsFor={formatCurrency(
                dashboardData && dashboardData.total2DaysEarnings
                  ? dashboardData.total2DaysEarnings[0].earnings95
                  : 0
              )}
              cardFor={CONSTS.TWO_DAYS_EARNINGS}
              image={dollar}
            />
          </Col>
          <Col lg={4}>
            <CommonCardFunction
              countsFor={formatCurrency(
                dashboardData && dashboardData.total30DaysEarnings
                  ? dashboardData.total30DaysEarnings[0].earnings95
                  : 0
              )}
              cardFor={CONSTS.THIRTY_DAYS_EARNINGS}
              image={dollar}
            />
          </Col>
          <Col lg={4}>
            <CommonCardFunction
              countsFor={formatCurrency(
                dashboardData && dashboardData.totalEarnings
                  ? dashboardData.totalEarnings[0].earnings95
                  : 0
              )}
              cardFor={CONSTS.TOTAL_EARNINGS}
              image={dollar}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default DashboardIndex;

export const CommonCardFunction = ({ countsFor, cardFor, icon, image }) => {
  return (
    <Card className="d-flex flex-sm-row justify-content-sm-between">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <CardTitle style={{ margin: "10px 20px 0px 20px" }} className="h3">
          {cardFor}
        </CardTitle>
        <div style={{ margin: "10px 20px 0px 20px" }}>
          <div className="font-size-16 " style={{ fontWeight: "bold" }}>
            <h2>{countsFor !== 0 ? countsFor : 0}</h2>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center flex-sm-row justify-content-end">
        <div
          className="avatar-sm font-size-16 me-4 mb-2"
          style={{
            textAlign: "right",
          }}
        >
          <span className="avatar-title text-primary rounded">
            <img
              src={image}
              style={{ width: 35, height: 35 }}
              alt={countsFor}
            />
          </span>
        </div>
      </div>
    </Card>
  );
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat().format(number);
};

export const formatCurrency = (amount) => {
  if (amount >= 1e9) {
    return `$${(amount / 1e9).toFixed(1)}B`;
  } else if (amount >= 1e6) {
    return `$${(amount / 1e6).toFixed(1)}M`;
  } else if (amount >= 1e3) {
    return `$${(amount / 1e3).toFixed(1)}k`;
  } else {
    return `$${amount.toFixed(2)}`;
  }
};
