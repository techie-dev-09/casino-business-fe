import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  GetWebhookDataAPI,
  SetWebhookDataAPI,
} from "../../services/productsService";
import {
  NotificationToastContainer,
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import { notificationMessageFunction } from "../../constants/notificationConst";
import CustomInput from "../../components/Custom/textinput";

function WidgetWebhook() {
  const [webhookData, setWebhookData] = useState({});
  const validationSchemaForWebhookURL = Yup.object({
    webhook_url: Yup.string()
      //   .matches(
      //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      //     "Enter correct url!"
      //   )
      .required("Please enter webhook URL"),
  });

  const initialValueWebhook = {
    webhook_url:
      webhookData && webhookData.webhook_url ? webhookData.webhook_url : "",
  };

  const GetWebhookDataFunction = () => {
    GetWebhookDataAPI()
      .then((res) => {
        setWebhookData(res.data.data.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    GetWebhookDataFunction();
  }, []);

  const handleSetWebhook = (values) => {
    const data = { webhook_url: values.webhook_url };
    SetWebhookDataAPI(data)
      .then((res) => {
        const data = res && res.data && res.data.data && res.data.data.data;
        setWebhookData(data);
        notifySuccess("Webhook set successfully");
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
        <Breadcrumbs title="Dashboard" breadcrumbItem="Webhook" to="/" />
        <Row style={{ marginLeft: 58, msOverflowStyle: "none" }}>
          <Col lg={12} md={12} sm={12}>
            <Card style={{ height: "99%" }}>
              <CardBody>
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
                            htmlFor="secretKey"
                            className="text-black font-size-12"
                          >
                            Webhook URL
                          </Label>
                          <CustomInput
                            type="text"
                            values={values}
                            placeholder={"Enter Webhook URL"}
                            handleChange={handleChange}
                            errors={errors}
                            touched={touched}
                            className={"font-size-12"}
                            name="webhook_url"
                          />
                        </FormGroup>
                        <Col lg={2}>
                          <div className="mt-3 text-center waves-effect waves-light">
                            <button
                              type="submit"
                              name="btn"
                              className="btn btn-primary font-size-14 ms-2"
                              style={{ width: "140px", borderRadius: "8px" }}
                              onSubmit={handleSetWebhook}
                            >
                              Set Webhook
                            </button>
                          </div>
                        </Col>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <NotificationToastContainer />
    </React.Fragment>
  );
}

export default WidgetWebhook;
