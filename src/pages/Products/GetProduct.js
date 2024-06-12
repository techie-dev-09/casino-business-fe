import React, { useState } from "react";
import PreviewProduct from "./PreviewProduct";
import moment from "moment";
import DeleteProduct from "./DeleteProduct";

function GetProduct({ index, product, userData, getProducts }) {
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleClose = () => {
    setModal(false);
  };
  return (
    <tr key={index} className="font-size-12">
      <td className="pl-4 text-center">{index + 1}</td>
      <td className="pl-4 text-center">
        <img src={product.product_image} height={"75px"} alt="" />
      </td>
      <td className="pl-4 text-center">{product.product_id}</td>
      <td className="pl-4 text-center">{product.product_name}</td>
      <td className="pl-4 text-center">{product.category}</td>
      <td className="pl-4 text-center">{product.author_name}</td>
      <td className="pl-4 text-center">{product.commodity_amount}</td>
      <td className="pl-4 text-center">
        {moment(product.created_at).format("DD MMM YYYY")}
      </td>
      <td className="pl-4 text-center">
        <i
          className="mdi mdi-eye-outline font-size-16 cursor-pointer"
          onClick={() => setModal(true)}
        />

        <i
          className="mdi mdi-close font-size-16 cursor-pointer"
          style={{ color: "red" }}
          onClick={() => setDeleteModal(true)}
        />
        {modal && (
          <PreviewProduct
            modal={modal}
            handleClose={handleClose}
            productImage={product.product_image}
            authorImage={product.author_image}
            values={product}
            userData={userData}
            showIframe={true}
          />
        )}
        {deleteModal && (
          <DeleteProduct
            deleteModal={deleteModal}
            handleClose={() => setDeleteModal(false)}
            product_id={product.product_id}
            getProducts={getProducts}
          />
        )}
      </td>
    </tr>
  );
}

export default GetProduct;
