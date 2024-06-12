import React from "react";

const EmptyView = ({ icon, title, discription, bgcolor }) => {
  return (
    <div
      style={{
        padding: 40,
        backgroundColor: bgcolor,
        border: "1px solid #EDEDED",
      }}
      className="w-100 d-flex justify-content-center align-items-center flex-column"
    >
      <i className={icon} style={{ fontSize: 50 }} />
      <div style={{ color: "#000000", fontSize: 14, fontWeight: "bold" }}>
        {" "}
        {title}{" "}
      </div>
      <div className="mb-10">{discription}</div>
    </div>
  );
};
export default EmptyView;
