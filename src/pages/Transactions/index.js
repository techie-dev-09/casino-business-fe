import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import { GetTransactionsListAPI } from "../../services/productsService";
import { get } from "lodash";
import { Paginator } from "primereact/paginator";
import GetTransaction from "./GetTransaction";

function Transactions() {
  const [first, setFirst] = useState(0);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getAllTransactions = () => {
    GetTransactionsListAPI()
      .then((res) => {
        const slicedData = get(res, "data.data.data", []).slice(
          first,
          first + 10
        );
        setCurrentPageData(slicedData);
        setTransactions(res.data.data.data);
        setTotalCount(res.data.data.count);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  const onPageChange = (event) => {
    setFirst(event.first);
    const newPageData = transactions.slice(
      event.first,
      event.first + event.rows
    );
    setCurrentPageData(newPageData);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Dashboard" breadcrumbItem="Transactions" to="/" />
        <Row style={{ marginLeft: 58, msOverflowStyle: "none" }}>
          <Col lg={12} md={12} sm={12}>
            <Card style={{ height: "99%" }}>
              <CardBody>
                <div className="table-responsive">
                  <table className="table table-centered table-hover">
                    <thead className="text-center">
                      <tr className="font-size-14 text-black">
                        <th className="pl-4 pt-3 pb-4 border-0">#</th>
                        <th className="pt-3 pb-4 border-0">ID</th>
                        <th className="pt-3 pb-4 border-0">Product</th>
                        <th className="pt-3 pb-4 border-0">Product Name</th>
                        <th className="pt-3 pb-4 border-0">Product ID</th>
                        <th className="pt-3 pb-4 border-0">Base</th>
                        <th className="pt-3 pb-4 border-0">Base Amount</th>
                        <th className="pt-3 pb-4 border-0">Quote</th>
                        <th className="pt-3 pb-4 border-0">Quote Amount</th>
                        <th className="pt-3 pb-4 border-0">Address</th>
                        <th className="pt-3 pb-4 border-0">Status</th>
                        <th className="pt-3 pb-4 border-0">Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageData && currentPageData.length > 0 ? (
                        currentPageData.map((order, index) => (
                          <GetTransaction order={order} index={index} />
                        ))
                      ) : (
                        <tr className="text-center">
                          <td colSpan={10}>No transactions found</td>
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
    </React.Fragment>
  );
}

export default Transactions;
