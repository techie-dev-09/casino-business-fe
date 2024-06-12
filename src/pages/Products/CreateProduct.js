import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import { REGION, S3_BUCKET } from "../../components/Constant/AWSConstants";
import "./WidgetCustomization.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Button, Card, CardBody, Col, FormGroup, Row } from "reactstrap";
// import WertWidget from "./WertWidget";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage } from "formik";
import CustomInput from "../../components/Custom/textinput";
import PreviewProduct from "./PreviewProduct";
import { CreateProductAPI } from "../../services/productsService";
import {
  notifyError,
  notifySuccess,
} from "../../components/Custom/notification";
import { notificationMessageFunction } from "../../constants/notificationConst";
import { getUserAccount } from "../../services/accountService";

function CreateProduct(props) {
  const [productImage, setProductImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [productImageName, setProductImageName] = useState("");
  const [authorImageName, setAuthorImageName] = useState("");
  const [selectedProductFile, setSelectedProductFile] = useState(null);
  const [selectedAuthorFile, setSelectedAuthorFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState({});

  const userDetailsFunction = () => {
    getUserAccount()
      .then((res) => {
        if (res && res.data && res.data.data.data) {
          const data = res.data.data.data;
          setUserData(data);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    userDetailsFunction();
  }, []);

  const handleClose = () => {
    setModal(false);
  };

  const createProductSchema = Yup.object().shape({
    product_name: Yup.string()
      .trim()
      .required("Please enter product name")
      .max(50, "Product Name should be only 50 characters long"),
    category: Yup.string()
      .trim()
      .required("Please enter category")
      .max(50, "Category should be only 50 characters long"),
    author_name: Yup.string()
      .trim()
      .required("Please enter author name")
      .max(50, "Author Name should be only 50 characters long"),
    commodity_amount: Yup.number()
      .required("Please enter commodity amount")
      .positive("Commodity amount must be a positive number")
      .integer("Commodity amount must be an integer"),
    product_image: Yup.mixed()
      .required("Please upload a product image")
      .test(
        "fileSize",
        "File size is too large",
        (value) => value && value.size <= 1048576 // 1MB
      )
      .test(
        "fileType",
        "Unsupported File Format",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    author_image: Yup.mixed()
      .required("Please upload an author image")
      .test(
        "fileSize",
        "File size is too large",
        (value) => value && value.size <= 1048576 // 1MB
      )
      .test(
        "fileType",
        "Unsupported File Format",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const handleFileInput = (
    e,
    setFieldValue,
    fieldName,
    setImageName,
    setFile
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageName(e.target.files[0].name);
      setFile(e.target.files[0]);
      setFieldValue(fieldName, e.target.files[0]);
    }
  };

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const uploadFile = (file, setFieldError, setImageUrl) => {
    return new Promise((resolve, reject) => {
      if (file && file.name) {
        let randomNumber = Math.floor(Math.random() * 100000 + 1);
        let currentDate = Date.now();
        let randomString = `${randomNumber}-${currentDate}`;
        const fileName = `${randomString}.${file.name.split(".").pop()}`;
        const params = {
          Body: file,
          Bucket: S3_BUCKET,
          Key: fileName,
        };

        myBucket
          .putObject(params)
          .on("httpUploadProgress", (evt) => {})
          .send((err, data) => {
            if (err) {
              console.error(err);
              setFieldError("productImage", "Failed to upload image");
              reject(err);
            } else {
              const uploadedUrl = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
              setImageUrl(uploadedUrl);
              resolve(uploadedUrl);
            }
          });
      } else {
        resolve(null);
      }
    });
  };

  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    setSubmitting(true);
    try {
      const uploadedProductImageUrl = await uploadFile(
        selectedProductFile,
        setFieldError,
        setProductImage
      );
      const uploadedAuthorImageUrl = await uploadFile(
        selectedAuthorFile,
        setFieldError,
        setAuthorImage
      );

      const formData = {
        ...values,
        product_image: uploadedProductImageUrl,
        author_image: uploadedAuthorImageUrl,
      };

      CreateProductAPI(formData)
        .then((res) => {
          props.history.push("/products");
          notifySuccess("Product Created Successfully");
        })
        .catch((err) => {
          const errorMessage = err.data.error.message;
          notifyError(notificationMessageFunction(errorMessage));
        });
    } catch (error) {
      console.error("Error uploading files: ", error);
    }
    setSubmitting(false);
  };

  const showPreview = async (values, { setFieldError }) => {
    await uploadFile(selectedProductFile, setFieldError, setProductImage);
    await uploadFile(selectedAuthorFile, setFieldError, setAuthorImage);
    setModal(true);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Products" breadcrumbItem="Create" to="/" />
        <Row style={{ marginLeft: 58, msOverflowStyle: "none" }}>
          <Col lg={12} md={12} sm={12}>
            <Card style={{ height: "99%" }}>
              <CardBody>
                <Row>
                  <Formik
                    initialValues={{
                      product_name: "",
                      category: "",
                      author_name: "",
                      commodity_amount: 0,
                      product_image: null,
                      author_image: null,
                    }}
                    validationSchema={createProductSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      errors,
                      touched,
                      values,
                      handleChange,
                      setFieldValue,
                      setFieldError,
                      isSubmitting,
                    }) => (
                      <Form>
                        <Row>
                          <Col lg={5}>
                            <FormGroup>
                              <label>Product Name</label>
                              <CustomInput
                                type="text"
                                values={values}
                                placeholder="Enter product name"
                                name="product_name"
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                style={{ color: "black" }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={5}>
                            <FormGroup>
                              <label>Product Image</label>
                              <div className="file-upload-form d-flex flex-column">
                                <label
                                  htmlFor="productImage"
                                  className="file-upload-label p-2 font-size-12"
                                >
                                  <div className="file-upload-design">
                                    <span className="browse-button">
                                      Browse file
                                    </span>{" "}
                                    <span>or</span>
                                    <span>Drag and Drop</span>
                                  </div>
                                  <input
                                    id="productImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileInput(
                                        e,
                                        setFieldValue,
                                        "product_image",
                                        setProductImageName,
                                        setSelectedProductFile
                                      )
                                    }
                                  />
                                </label>
                              </div>
                              <div className="d-flex align-items-left justify-content-start">
                                <span className="font-size-10">
                                  {extractFromAddress(productImageName)}
                                </span>
                              </div>

                              {errors.product_image &&
                                touched.product_image && (
                                  <div className="text-danger">
                                    <ErrorMessage name="product_image" />
                                  </div>
                                )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col lg={5}>
                            <FormGroup>
                              <label>Author Name</label>
                              <CustomInput
                                type="text"
                                values={values}
                                placeholder="Enter author name"
                                name="author_name"
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                style={{ color: "black" }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={5}>
                            <FormGroup>
                              <label>Author Image</label>
                              <div className="file-upload-form d-flex flex-column">
                                <label
                                  htmlFor="authorImage"
                                  className="file-upload-label p-2 font-size-12"
                                >
                                  <div className="file-upload-design">
                                    <span className="browse-button">
                                      Browse file
                                    </span>{" "}
                                    <span>or</span>
                                    <span>Drag and Drop</span>
                                  </div>
                                  <input
                                    id="authorImage"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleFileInput(
                                        e,
                                        setFieldValue,
                                        "author_image",
                                        setAuthorImageName,
                                        setSelectedAuthorFile
                                      )
                                    }
                                  />
                                </label>
                              </div>
                              <div className="d-flex align-items-left justify-content-start">
                                <span className="font-size-10">
                                  {extractFromAddress(authorImageName)}
                                </span>
                              </div>

                              {errors.author_image && touched.author_image && (
                                <div className="text-danger">
                                  <ErrorMessage name="author_image" />
                                </div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col lg={5}>
                            <FormGroup>
                              <label>Commodity Amount ($)</label>
                              <CustomInput
                                type="number"
                                values={values}
                                placeholder="Enter commodity amount"
                                name="commodity_amount"
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                style={{ color: "black" }}
                                min={0}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={5}>
                            <FormGroup>
                              <label>Category</label>
                              <CustomInput
                                type="text"
                                values={values}
                                placeholder="Enter category"
                                name="category"
                                handleChange={handleChange}
                                touched={touched}
                                errors={errors}
                                style={{ color: "black" }}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <div className="d-flex mt-3" style={{ width: "40%" }}>
                            <Button
                              disabled={isSubmitting}
                              type="button"
                              style={{ width: "100px", borderRadius: "8px" }}
                              name="btn"
                              className="btn btn-primary font-size-14"
                              color="primary"
                              onClick={(values) => {
                                showPreview(values, { setFieldError });
                              }}
                            >
                              Preview
                            </Button>
                            {modal && (
                              <PreviewProduct
                                modal={modal}
                                handleClose={handleClose}
                                productImage={productImage}
                                authorImage={authorImage}
                                values={values}
                                userData={userData}
                              />
                            )}
                            <Button
                              disabled={isSubmitting}
                              type="submit"
                              style={{ width: "100px", borderRadius: "8px" }}
                              name="btn"
                              className="btn btn-primary font-size-14 ms-2"
                              color="primary"
                              onSubmit={(values) => handleSubmit(values)}
                            >
                              Create
                            </Button>
                          </div>
                        </Row>
                      </Form>
                    )}
                  </Formik>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default CreateProduct;

export function extractFromAddress(address) {
  if (address) {
    const firstSix = address.substring(0, 6);
    const lastFour = address.substring(address.length - 4);

    return `${firstSix}...${lastFour}`;
  }
}
