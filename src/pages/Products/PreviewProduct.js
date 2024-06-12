import React from "react";
import WertWidget from "./WertWidget";
import { Button, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { ModalTitle } from "react-bootstrap";
import copy from "copy-to-clipboard";
import { notifySuccess } from "../../components/Custom/notification";

function PreviewProduct({
  modal,
  handleClose,
  values,
  productImage,
  authorImage,
  userData,
  showIframe = false,
}) {
  const copyToClipboard = () => {
    const iframeCode = `<iframe src="http://localhost:3001/buy-sell/buy-nft?product_id=${values.product_id}&api_key=${userData.api_key}"
width='780px'
height='540px'
title='1buy.io'
frameBorder='1'
/>`;
    copy(iframeCode);
    notifySuccess("iframe code copied successfully");
  };

  return (
    <div>
      <Modal isOpen={modal} centered={true} size="lg">
        <ModalHeader
          toggle={handleClose}
          style={{
            borderBottom: "none",
            textAlign: "center",
            paddingBottom: "0%",
          }}
        >
          <ModalTitle>
            <b>Goods Widget</b>
          </ModalTitle>
        </ModalHeader>
        <ModalBody className="ps-1 pe-1">
          <WertWidget
            name={values.product_name}
            category={values.category}
            author={values.author_name}
            commodity_amount={values.commodity_amount}
            author_image_url={authorImage}
            image_url={productImage}
          />
          {showIframe && (
            <Row className="mt-3 mx-3">
              <span className="font-size-12 font-weight-medium text-black">
                Your Widget Code
              </span>
              <pre
                className="p-2 text-black"
                style={{ borderRadius: "8px", border: "1px solid #b8b2db" }}
              >
                <code className="javascript">
                  {`<iframe src="http://localhost:3001/buy-sell/buy-nft?product_id=${values.product_id}
&api_key=${userData.api_key}"
width='780px'
height='540px'
title='1buy.io'
frameBorder='1'
/>`}
                </code>
              </pre>
              <div className="mt-3 text-center" style={{ width: "20%" }}>
                <Button
                  type="button"
                  style={{ width: "150px", borderRadius: "8px" }}
                  name="btn"
                  className="btn btn-primary font-size-14"
                  color="primary"
                  onClick={copyToClipboard}
                >
                  Copy iframe
                </Button>
              </div>
            </Row>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PreviewProduct;
