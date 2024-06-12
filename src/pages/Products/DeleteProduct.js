import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { DeleteProductAPI } from "../../services/productsService";
import { notifySuccess } from "../../components/Custom/notification";

function DeleteProduct({ deleteModal, handleClose, product_id, getProducts }) {
  const deleteProduct = () => {
    DeleteProductAPI(product_id)
      .then((res) => {
        getProducts();
        notifySuccess("Product Deleted Successfully");
        handleClose();
      })
      .catch(() => {});
  };

  return (
    <Modal isOpen={deleteModal} centered={true}>
      <ModalHeader
        toggle={handleClose}
        style={{
          borderBottom: "none",
          textAlign: "center",
          paddingLeft: "30%",
          paddingBottom: "0%",
        }}
      ></ModalHeader>
      <ModalBody className="ps-1 pe-1">
        <span className="font-size-16 d-flex justify-content-center text-black">
          Are you sure you want to delete this product?
        </span>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <Button
            type="button"
            name="btn"
            className="custombtn"
            color="danger"
            onClick={() => deleteProduct()}
          >
            Delete
          </Button>

          <Button
            type="button"
            name="btn"
            className="custombtn ms-2"
            color="primary"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default DeleteProduct;
