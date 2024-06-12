// import React, { useEffect, useState } from "react";
// import { Table, Col, Card, CardBody, Row, Button, CardTitle } from "reactstrap";
// import { userDashboardData } from "../../services/dashboradService";
// import EmptyView from "../../components/Custom/EmptyView";
// import { CommonCardFunction } from "../AppDashboard";
// import { getCurrentPackage } from "../../services/accountService";
// import { constants as CONSTS } from "../../constants/constants";

// import LinkIcon from "../../assets/images/Icons/link.png";
// import TotalClick from "../../assets/images/Icons/totalClick.png";
// import DomainIcon from "../../assets/images/Icons/domain.png";
// import TotalLink from "../../assets/images/Icons/totalLink.png";
// import TodayClick from "../../assets/images/Icons/todayClick.png";
// import Space from "../../assets/images/Icons/space2.png";
// import DeletedLink from "../../assets/images/Icons/deletedLink.png";

// import UserBrowser from "./TopBrowser";
// import UserOs from "./TopOs";
// import UserCountry from "./TopCountry";

// import VerificationWarning from "../../components/Common/VerificationWarning";
// import { SkeletonScreen } from "../Skeletons/DashboardSkeleton";
// import { DashboardTableSkeleton } from "../Skeletons/DashBoardTablesSkeleton";

// const UserDashboard = () => {
//   const [userData, setUserData] = useState([]);
//   const [newestUrl, setNewestUrl] = useState([]);
//   const [popularUrl, setPopularUrl] = useState([]);
//   const [currentPackage, setCurrentPackage] = useState([]);

//   // ? URLs
//   const [selectDayIs] = useState(30);
//   const [selectChart, setSelectChart] = useState("lastday");
//   const [lableName, setLableName] = useState([]);
//   const [chartTitle, setChartTitle] = useState(CONSTS.LAST_30_DAYS);
//   const [URLData, setURLData] = useState([]);
//   const [clickData, setClickData] = useState([]);

//   const [isLoading, setIsLoading] = useState(false);
//   const [dashboardDataLoading, setDashboardDataLoading] = useState(false);
//   const [isClickLoading, setClickIsLoading] = useState(false);

//   const startLoading = () => {
//     setIsLoading(true);
//   };
//   const stopLoading = () => {
//     setIsLoading(false);
//   };

//   const startClickLoading = () => {
//     setClickIsLoading(true);
//   };
//   const stopClickLoading = () => {
//     setClickIsLoading(false);
//   };

//   const handleChangeChartTitle = (chartTitle) => {
//     setChartTitle(chartTitle);
//   };

//   const handleChangeChart = (chartType) => {
//     setSelectChart(chartType);
//   };

//   const getTodayURLData = (selectDay) => {
//     const type = "url";
//     startLoading();
//     UserTodayChartData(type, selectDay)
//       .then((res) => {
//         const hoursURLData = res.data.data.hoursData;
//         setURLData(Object.values(hoursURLData));
//         stopLoading();
//       })
//       .catch((err) => {});
//   };

//   const getTodayClickData = (selectDay) => {
//     const type = "click";
//     startClickLoading();
//     UserTodayChartData(type, selectDay)
//       .then((res) => {
//         const hoursClickData = res.data.data.hoursData;
//         stopClickLoading();
//         setClickData(Object.values(hoursClickData));
//       })
//       .catch((err) => {});
//   };

//   const getDaysClickData = (selectDaysCount, type) => {
//     const data = {
//       days: selectDaysCount,
//     };
//     if (type === "click") {
//       startClickLoading();
//     }
//     if (type === "url") {
//       startLoading();
//     }
//     UserLastDaysChartData(type, data)
//       .then((res) => {
//         const daysData = res.data.data.daysData;
//         if (type === "click") {
//           stopClickLoading();
//           setClickData(Object.values(daysData));
//         }
//         if (type === "url") {
//           stopLoading();
//           setURLData(Object.values(daysData));
//         }
//         setLableName(Object.keys(daysData));
//       })
//       .catch((err) => {});
//   };

//   const getMonthClickData = (monthIs, type) => {
//     if (type === "click") {
//       startClickLoading();
//     }
//     if (type === "url") {
//       startLoading();
//     }
//     UserMonthChartData(type, monthIs)
//       .then((res) => {
//         const monthsClickData = res.data.data.thisMonthData;
//         if (type === "click") {
//           stopClickLoading();
//           setClickData(Object.values(monthsClickData));
//         }
//         if (type === "url") {
//           stopLoading();
//           setURLData(Object.values(monthsClickData));
//         }
//         setLableName(Object.keys(monthsClickData));
//       })
//       .catch((err) => {});
//   };

//   const getLastMonthClickData = (monthIs, type) => {
//     if (type === "click") {
//       startClickLoading();
//     }
//     if (type === "url") {
//       startLoading();
//     }
//     UserMonthChartData(type, monthIs)
//       .then((res) => {
//         const monthsClickData = res.data.data.lastMonthData;
//         if (type === "click") {
//           stopClickLoading();
//           setClickData(Object.values(monthsClickData));
//         }
//         if (type === "url") {
//           stopLoading();
//           setURLData(Object.values(monthsClickData));
//         }
//         setLableName(Object.keys(monthsClickData));
//       })
//       .catch((err) => {});
//   };

//   const getCustomClickData = (payData, type) => {
//     if (type === "click") {
//       startClickLoading();
//     }
//     if (type === "url") {
//       startLoading();
//     }
//     UserCustomChartData(type, payData)
//       .then((res) => {
//         const monthsClickData = res.data.data.daysData;
//         if (type === "click") {
//           stopClickLoading();
//           setClickData(Object.values(monthsClickData));
//         }
//         if (type === "url") {
//           stopLoading();
//           setURLData(Object.values(monthsClickData));
//         }
//         setLableName(Object.keys(monthsClickData));
//       })
//       .catch((err) => {});
//   };

//   const dayData = [
//     "00:00",
//     "",
//     "02:00",
//     "",
//     "04:00",
//     "",
//     "06:00",
//     "",
//     "08:00",
//     "",
//     "10:00",
//     "",
//     "12:00",
//     "",
//     "14:00",
//     "",
//     "16:00",
//     "",
//     "18:00",
//     "",
//     "20:00",
//     "",
//     "22:00",
//     "",
//     "24:00",
//   ];

//   const currentPackageFunction = () => {
//     setDashboardDataLoading();
//     getCurrentPackage()
//       .then((res) => {
//         const data = res && res.data && res.data.data && res.data.data.data;
//         setCurrentPackage(data);
//       })
//       .catch((err) => {
//         setCurrentPackage({});
//       });
//   };

//   const getDashboardData = () => {
//     setDashboardDataLoading(true);
//     userDashboardData()
//       .then((res) => {
//         const data = res && res.data && res.data.data && res.data.data.data;
//         setUserData(data);
//         setNewestUrl(data.newestUrl);
//         setPopularUrl(data.popularUrl);
//         setDashboardDataLoading(false);
//       })

//       .catch((err) => {
//         setDashboardDataLoading(false);
//       });
//   };

//   useEffect(() => {
//     currentPackageFunction();
//     getDashboardData();
//   }, []);

//   useEffect(() => {
//     getDaysClickData(selectDayIs, "click");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectDayIs]);

//   useEffect(() => {
//     getDaysClickData(selectDayIs, "url");
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectDayIs]);

//   return (
//     <>
//       <React.Fragment>
//         <div className="page-content">
//           <Row>
//             <Col className="col-12">
//               <div className="page-title-box d-flex align-items-start align-items-center justify-content-between">
//                 <h4
//                   className="page-title mb-0 font-size-18"
//                   style={{ marginLeft: 70 }}
//                 >
//                   {CONSTS.ONLY_DASHBOARD}
//                 </h4>
//               </div>
//             </Col>
//           </Row>
//           <VerificationWarning />
//           {dashboardDataLoading ? (
//             <SkeletonScreen />
//           ) : (
//             <>
//               <Row
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginLeft: 60,
//                 }}
//               >
//                 <Col lg={4}>
//                   <Card>
//                     <CardTitle
//                       style={{ margin: "10px 20px 0px 20px" }}
//                       className="h3"
//                     >
//                       {CONSTS.TOTAL_LINKS}
//                     </CardTitle>

//                     <div className="d-flex justify-content-between">
//                       <div style={{ margin: "10px 20px 0px 20px" }}>
//                         <h2>{userData.length !== 0 ? userData.urlCount : 0}</h2>
//                       </div>

//                       <div className="avatar-sm font-size-20 me-4 ">
//                         <span className="avatar-title text-primary rounded">
//                           <img
//                             src={TotalLink}
//                             style={{ width: 35, height: 35 }}
//                             alt="TotalLink"
//                           />
//                         </span>
//                       </div>
//                     </div>
//                   </Card>
//                 </Col>

//                 <Col lg={4}>
//                   <Card>
//                     <CardTitle
//                       style={{ margin: "10px 20px 0px 20px" }}
//                       className="h3"
//                     >
//                       {CONSTS.TOTAL_SPACES}
//                     </CardTitle>

//                     <div className="d-flex justify-content-between">
//                       <div style={{ margin: "10px 20px 0px 20px" }}>
//                         <h2>
//                           {userData.length !== 0 ? userData.spaceCount : 0}
//                         </h2>
//                       </div>

//                       <div className="avatar-sm font-size-20 me-4 ">
//                         <span className="avatar-title text-primary rounded">
//                           <img
//                             src={Space}
//                             style={{ width: 35, height: 35 }}
//                             alt="Space"
//                           />
//                         </span>
//                       </div>
//                     </div>
//                   </Card>
//                 </Col>

//                 <Col lg={4}>
//                   <Card>
//                     <CardTitle
//                       style={{ margin: "10px 20px 0px 20px" }}
//                       className="h3"
//                     >
//                       {CONSTS.TOTAL_DOMAINS}
//                     </CardTitle>

//                     <div className="d-flex justify-content-between">
//                       <div style={{ margin: "10px 20px 0px 20px" }}>
//                         <h2>
//                           {userData.length !== 0 ? userData.domainCount : 0}
//                         </h2>
//                       </div>

//                       <div className="avatar-sm font-size-20 me-4 ">
//                         <span className="avatar-title text-primary rounded">
//                           <img
//                             src={DomainIcon}
//                             style={{ width: 35, height: 35 }}
//                             alt="DomainIcon"
//                           />
//                         </span>
//                       </div>
//                     </div>
//                   </Card>
//                 </Col>
//               </Row>
//               <Row
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginLeft: 60,
//                 }}
//               >
//                 <Col lg={4}>
//                   <CommonCardFunction
//                     countsFor={userData.totalClicks ? userData.totalClicks : 0}
//                     cardFor={CONSTS.TODAYS_ORDERS}
//                     image={TotalClick}
//                   />
//                 </Col>
//                 <Col lg={4}>
//                   <CommonCardFunction
//                     countsFor={userData.todayUrls ? userData.todayUrls : 0}
//                     cardFor={CONSTS.TOTAL_ORDERS}
//                     image={LinkIcon}
//                   />
//                 </Col>
//                 <Col lg={4}>
//                   <CommonCardFunction
//                     countsFor={userData.todayClicks ? userData.todayClicks : 0}
//                     cardFor={CONSTS.TOTAL_EARNINGS}
//                     image={TodayClick}
//                   />
//                 </Col>
//               </Row>
//               <Row
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginLeft: 60,
//                 }}
//               >
//                 <Col lg={4}>
//                   <CommonCardFunction
//                     countsFor={userData.deletedUrls ? userData.deletedUrls : 0}
//                     cardFor={CONSTS.DELETED_LINKS}
//                     image={DeletedLink}
//                   />
//                 </Col>
//               </Row>
//             </>
//           )}
//           <Row style={{ marginLeft: 59, marginRight: 10 }}>
//             {(!currentPackage.advance_statistics || !currentPackage) && (
//               <>
//                 <LockStatistics dayData={dayData} chartFor={"URLs"} />
//               </>
//             )}
//           </Row>

//           {dashboardDataLoading ? (
//             <DashboardTableSkeleton />
//           ) : (
//             <Row
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginLeft: 60,
//                 marginTop: 20,
//               }}
//             >
//               <Col lg={6} md={12} sm={12}>
//                 <Card style={{ height: "97%" }}>
//                   <CardBody style={{ overflowX: "scroll" }}>
//                     <CardTitle
//                       style={{ margin: "0px 0px 10px 10px" }}
//                       className="h4"
//                     >
//                       {CONSTS.LATEST_LINKS}
//                     </CardTitle>
//                     <div className="table-responsive">
//                       <Table hover className="table mb-0">
//                         <thead>
//                           <tr className="text-center">
//                             <th className="text-left"> {CONSTS.SR_NO}</th>
//                             <th>{CONSTS.SHORT_URL}</th>
//                             <th>{CONSTS.CREATED_AT}</th>
//                             <th>{CONSTS.CLICKS}</th>
//                             <th>{CONSTS.QR}</th>
//                             <th>{CONSTS.ACTION}</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {newestUrl?.length === 0 && (
//                             <tr>
//                               <td colSpan={12}>
//                                 <EmptyView
//                                   title={CONSTS.SORRY}
//                                   discription={CONSTS.NO_LINKS_FOUND}
//                                   bgcolor={"white"}
//                                   icon={"mdi mdi-link-variant"}
//                                 ></EmptyView>
//                               </td>
//                             </tr>
//                           )}
//                           {newestUrl?.map((links, key) => (
//                             <tr key={key}>
//                               <ShortedURL
//                                 linkData={links}
//                                 index={key}
//                                 currentPackage={currentPackage}
//                               />
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Col>
//               <Col lg={6} md={12} sm={12}>
//                 <Card
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     height: "97%",
//                   }}
//                 >
//                   <CardBody style={{ overflowX: "scroll" }}>
//                     <CardTitle
//                       style={{ margin: "0px 0px 10px 10px" }}
//                       className="h4"
//                     >
//                       {CONSTS.POPULAR_LINKS}
//                     </CardTitle>
//                     <div className="table-responsive">
//                       <Table hover className="table mb-0">
//                         <thead>
//                           <tr className="text-center">
//                             <th className="text-left">{CONSTS.SR_NO}</th>
//                             <th>{CONSTS.SHORT_URL}</th>
//                             <th>{CONSTS.CREATED_AT}</th>
//                             <th>{CONSTS.CLICKS}</th>
//                             <th>{CONSTS.QR}</th>
//                             <th>{CONSTS.ACTION}</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {popularUrl?.length === 0 && (
//                             <tr>
//                               <td colSpan={12}>
//                                 <EmptyView
//                                   title={CONSTS.SORRY}
//                                   discription={CONSTS.NO_LINKS_FOUND}
//                                   bgcolor={"white"}
//                                   icon={"mdi mdi-link-variant"}
//                                 ></EmptyView>
//                               </td>
//                             </tr>
//                           )}
//                           {popularUrl?.map((links, key) => (
//                             <tr key={key}>
//                               <ShortedURL
//                                 linkData={links}
//                                 index={key}
//                                 currentPackage={currentPackage}
//                               />
//                             </tr>
//                           ))}
//                         </tbody>
//                       </Table>
//                     </div>
//                   </CardBody>
//                 </Card>
//               </Col>
//             </Row>
//           )}
//         </div>
//       </React.Fragment>
//     </>
//   );
// };
// export default UserDashboard;

// export const LockStatistics = ({ dayData, chartFor }) => {
//   return (
//     <Col lg={12} md={12} sm={12}>
//       <Card>
//         <CardBody>
//           <CardTitle
//             style={{
//               filter: "blur(3px)",
//             }}
//           >
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <span>
//                 <label style={{ fontSize: 20, marginRight: 5 }}>
//                   Todays {chartFor}
//                 </label>
//               </span>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <Button style={{ marginLeft: 10 }} color="primary">
//                   <i className="mdi mdi-filter"></i>
//                 </Button>{" "}
//                 <Button style={{ marginLeft: 10 }} color="primary">
//                   <i className="mdi mdi-calendar"></i>
//                 </Button>
//               </div>
//             </div>
//           </CardTitle>
//           <h1
//             style={{
//               textAlign: "center",
//             }}
//           >
//             <i className="mdi mdi-lock font-size-50"></i>
//           </h1>
//           <ReactApexChart
//             options={{
//               chart: {
//                 height: 350,
//                 type: "line",
//               },
//               dataLabels: { enabled: false },
//               stroke: { curve: "smooth", width: 3 },
//               xaxis: { categories: dayData },

//               series: [
//                 { name: CONSTS.LINKS, data: [] },
//                 { name: CONSTS.CLICKS, data: [] },
//               ],
//             }}
//             series={[
//               { name: CONSTS.LINKS, data: [] },
//               { name: CONSTS.CLICKS, data: [] },
//             ]}
//             type="area"
//             height={350}
//             className="apex-charts"
//             style={{
//               filter: "blur(3px)",
//             }}
//           />
//         </CardBody>
//       </Card>
//     </Col>
//   );
// };
