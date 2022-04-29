import React, { useEffect, useState } from "react";

const Pagination = ({
  rowsPerPage,
  totalElements,
  onChangePage,
  pageIndex,
}) => {
  const DEFAULT_NUMBER = 1;
  const [pageLimit, setPageLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(DEFAULT_NUMBER);

  useEffect(() => {
    setCurrentPage(pageIndex);
  }, [pageIndex]);

  useEffect(() => {
    setPageLimit(Math.ceil(totalElements / rowsPerPage));

    const check = currentPage * rowsPerPage;
    if (check > totalElements) {
      setCurrentPage(1);
    }
  }, [rowsPerPage, totalElements]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
    onChangePage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
    onChangePage(currentPage - 1);
  };

  const NextRightButton = ({ disabled, eventButton }) => {
    return (
      <div className={`page-item ${disabled}`}>
        <button className="page-link btn-paging" onClick={eventButton}>
          &#x21E8;
        </button>
      </div>
    );
  };

  const NextLeftButton = ({ disabled, eventButton }) => {
    return (
      <div className={`page-item ${disabled}`}>
        <button className="page-link btn-paging" onClick={eventButton}>
          &#8678;
        </button>
      </div>
    );
  };

  return (
    <div className="table-top__pagination">
      <div className="table-top__pagination-prev">
        <NextLeftButton
          eventButton={goToPreviousPage}
          disabled={currentPage === 1 ? "disabled" : null}
        />
      </div>
      <ul className="table-top__pagination-number">
        {currentPage} / {pageLimit}
      </ul>
      <div className="table-top__pagination-next">
        <NextRightButton
          eventButton={goToNextPage}
          disabled={
            currentPage === pageLimit || currentPage === 1 ? "disabled" : null
          }
        />
      </div>
    </div>
  );
};

export default Pagination;
