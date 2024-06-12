import React from "react";
import Pagination from "react-js-pagination";

export const PaginationFunction = ({
  activePage,
  totalCount,
  handlePageChange,
  pageDataCount,
}) => {
  return (
    <div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={pageDataCount}
        totalItemsCount={totalCount}
        pageRangeDisplayed={10}
        itemClass="page-item"
        linkClass="page-link"
        onChange={handlePageChange}
      />
    </div>
  );
};
