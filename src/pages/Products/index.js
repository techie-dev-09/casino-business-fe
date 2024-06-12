import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { NotificationToastContainer } from "../../components/Custom/notification";
import { GetProductListAPI } from "../../services/productsService";
import { get } from "lodash";
import { Paginator } from "primereact/paginator";
import GetProduct from "./GetProduct";
import { getUserAccount } from "../../services/accountService";

function Products(props) {
  const [first, setFirst] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [productList, setProductList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
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

  const createProduct = () => {
    if (userData.api_key) {
      props.history.push("/products/create");
    } else {
      props.history.push("/api-key");
    }
  };

  const getProducts = () => {
    GetProductListAPI()
      .then((res) => {
        const slicedData = get(res, "data.data.data", []).slice(
          first,
          first + 10
        );
        setCurrentPageData(slicedData);
        setProductList(res.data.data.data);
        setTotalCount(res.data.data.count);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getProducts();
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    const newPageData = productList.slice(
      event.first,
      event.first + event.rows
    );
    setCurrentPageData(newPageData);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="Products" to="/" />

        <Row style={{ marginLeft: 58, msOverflowStyle: "none" }}>
          <Col lg={12} md={12} sm={12}>
            <Card style={{ height: "99%" }}>
              <CardTitle
                className="h3"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div style={{ margin: "20px 0px 10px 20px" }}>Products</div>
                <div className="form-inline float-md-right">
                  <div className="search-box mt-2">
                    <div
                      className="position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Button
                        type="submit"
                        name="btn"
                        className="custombtn mr-3"
                        style={{
                          borderRadius: "8px",
                          marginRight: 10,
                        }}
                        color="primary"
                        onClick={() => createProduct()}
                      >
                        Create
                      </Button>
                    </div>
                  </div>
                </div>
              </CardTitle>
              <CardBody>
                <div className="table-responsive">
                  <table className="table table-centered table-hover">
                    <thead className="text-center">
                      <tr className="font-size-12 text-black">
                        <th className="pl-4 pt-3 pb-4 border-0">#</th>
                        <th className="pt-3 pb-4 border-0">Product</th>
                        <th className="pt-3 pb-4 border-0">Product ID</th>
                        <th className="pt-3 pb-4 border-0">Product</th>
                        <th className="pt-3 pb-4 border-0">Category</th>
                        <th className="pt-3 pb-4 border-0">Author</th>
                        <th className="pt-3 pb-4 border-0">Commodity Amount</th>
                        <th className="pt-3 pb-4 border-0">Created At</th>
                        <th className="pt-3 pb-4 border-0">Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageData && currentPageData.length > 0 ? (
                        currentPageData.map((product, index) => (
                          <GetProduct
                            product={product}
                            index={index}
                            userData={userData}
                            getProducts={getProducts}
                          />
                        ))
                      ) : (
                        <tr className="text-center">
                          <td colSpan={10}>
                            No products found{" "}
                            <Link to="/products/create">Create</Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <Paginator
                    rows={10}
                    totalRecords={totalCount}
                    first={first}
                    onPageChange={(e) => onPageChange(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <NotificationToastContainer />
    </React.Fragment>
  );
}

export default Products;
