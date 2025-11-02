import React from "react";

function Pagination({ currentPage, totalResults, pageSize, onPageChange }) {
  const totalPages = Math.ceil(totalResults / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="btn btn-primary"
      >
        &larr; Prev
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="btn btn-primary"
      >
        Next &rarr;
      </button>
    </div>
  );
}

export default Pagination;


