import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import { getUserAccount } from "../../services/accountService";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import copy from "copy-to-clipboard";
import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import {
  GenerateAPIKey,
  GetDepositWalletDataAPI,
  SetDepositWalletDataAPI,
} from "../../services/productsService";
import { notificationMessageFunction } from "../../constants/notificationConst";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/Custom/textinput";

function APIKey() {
  const [userData, setUserData] = useState({});
  const [apiKey, setApiKey] = useState(null);
  const [depositWallet, setDepositWallet] = useState({});
  const validationSchemaForWebhookURL = Yup.object({
    dev_deposit_wallet: Yup.string()
      //   .matches(
      //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      //     "Enter correct url!"
      //   )
      .required("Please enter deposit wallet"),
  });

  const initialValueWebhook = {
    dev_deposit_wallet: depositWallet ? depositWallet : "",
  };

  const GetDepositWalletFunction = () => {
    GetDepositWalletDataAPI()
      .then((res) => {
        setDepositWallet(res.data.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    GetDepositWalletFunction();
  }, []);

  const handleSetWebhook = (values) => {
    const data = { dev_deposit_wallet: values.dev_deposit_wallet };
    SetDepositWalletDataAPI(data)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        setDepositWallet(data);
        notifySuccess("Deposit wallet set successfully");
      })
      .catch((err) => {
        const errorMessage =
          err && err.data && err.data.error && err.data.error.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  };

  const userDetailsFunction = () => {
    getUserAccount()
      .then((res) => {
        if (res && res.data && res.data.data.data) {
          const data = res.data.data.data;
          setApiKey(data.api_key);
          setUserData(data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    userDetailsFunction();
  }, []);

  const generateAPIKeyFunction = () => {
    GenerateAPIKey()
      .then((res) => {
        userDetailsFunction();
        notifySuccess("API Key Generated Successfully");
      })
      .catch((err) => {
        const errorMessage =
          err && err.data && err.data.error && err.data.error.message;
        notifyError(notificationMessageFunction(errorMessage));
      });
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="API Key" to="/" />

        <Row style={{ marginLeft: 58, msOverflowStyle: "none" }}>
          <Col lg={12} md={12} sm={12}>
            <Card style={{ height: "99%" }}>
              <CardBody>
                <span className="d-none d-sm-block font-size-14 text-black">
                  API Key
                </span>
                <span>
                  An{" "}
                  <Link to="#" style={{ color: "#218FEB" }}>
                    API KEY
                  </Link>{" "}
                  uniquely identifies as a partner.
                </span>
                <br />
                {userData && !userData.api_key && (
                  <span>
                    You are able create products, only after generating API key
                  </span>
                )}
                {(userData && userData.api_key) || apiKey ? (
                  <div className="d-flex align-items-center mt-2">
                    <span style={{ color: "#218FEB" }}>
                      {userData.api_key ? userData.api_key : apiKey}
                    </span>
                    <i
                      className="mdi mdi-content-copy ml-3 font-size-20"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        copy(userData.api_key ? userData.api_key : apiKey);
                        notifySuccess("Your api key copied successfully");
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="mt-3 text-center waves-effect waves-light"
                    style={{ width: "20%" }}
                  >
                    <button
                      type="button"
                      style={{ width: "100px", borderRadius: "8px" }}
                      name="btn"
                      className="btn btn-primary font-size-14"
                      onClick={generateAPIKeyFunction}
                    >
                      Generate
                    </button>
                  </div>
                )}
                {((userData && userData.api_key) || apiKey) && (
                  <Col lg={6}>
                    <Formik
                      initialValues={initialValueWebhook}
                      validationSchema={validationSchemaForWebhookURL}
                      enableReinitialize
                      onSubmit={handleSetWebhook}
                    >
                      {({ values, errors, touched, handleChange }) => (
                        <Form>
                          <FormGroup>
                            <Label
                              htmlFor="dev_deposit_wallet"
                              className="text-black font-size-12"
                            >
                              Deposit Wallet
                            </Label>
                            <CustomInput
                              type="text"
                              values={values}
                              placeholder={"Enter Deposit Wallet"}
                              handleChange={handleChange}
                              errors={errors}
                              touched={touched}
                              className={"font-size-12"}
                              name="dev_deposit_wallet"
                            />
                          </FormGroup>
                          <Col lg={2}>
                            <div className="mt-3 text-center waves-effect waves-light">
                              <button
                                type="submit"
                                name="btn"
                                className="btn btn-primary font-size-14 ms-2"
                                style={{ width: "160px", borderRadius: "8px" }}
                                onSubmit={handleSetWebhook}
                              >
                                Set Deposit Wallet
                              </button>
                            </div>
                          </Col>
                        </Form>
                      )}
                    </Formik>
                  </Col>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <NotificationToastContainer />
    </React.Fragment>
  );
}

export default APIKey;
