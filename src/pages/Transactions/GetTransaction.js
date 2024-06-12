import moment from "moment";
import React from "react";

function GetTransaction({ index, order }) {
  return (
    <tr key={index} className="font-size-12">
      <td className="pl-4 text-center">{index + 1}</td>
      <td className="pl-4 text-center">{order.id}</td>
      <td className="pl-4 text-center">
        <img src={order.productData.product_image} height={75} alt="" />
      </td>
      <td className="pl-4 text-center text-black">
        {order.productData.product_name}
      </td>
      <td className="pl-4 text-center">{order.product_id}</td>
      <td className="pl-4 text-center">{order.base}</td>
      <td className="pl-4 text-center">{order.base_amount}</td>
      <td className="pl-4 text-center">{order.quote}</td>
      <td className="pl-4 text-center">{order.quote_amount}</td>
      <td className="pl-4 text-center">{order.address}</td>
      <td className="pl-4 text-center">{order.type}</td>
      <td className="pl-4 text-center">
        {moment(order.created_at).format("DD MMM YYYY")}
      </td>
    </tr>
  );
}

export default GetTransaction;
