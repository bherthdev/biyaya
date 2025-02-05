import React, { useState, useEffect } from "react";

const TablePagination = ({ data, rowsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    updateVisiblePages();
  }, [currentPage, totalPages]);

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const updateVisiblePages = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    setVisiblePages(pages);
  };

  const handlePageClick = (page) => {
    if (page === "...") return;
    goToPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Table */}
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead>
          <tr>
            <th className="border-b px-6 py-2 text-gray-600">ID</th>
            <th className="border-b px-6 py-2 text-gray-600">Name</th>
            <th className="border-b px-6 py-2 text-gray-600">Email</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-6 py-2">{item.id}</td>
              <td className="px-6 py-2">{item.name}</td>
              <td className="px-6 py-2">{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Showing X to Y of Z entries */}
      <div className="mt-2 text-sm text-gray-600">
        Showing {Math.min((currentPage - 1) * rowsPerPage + 1, data.length)} to{" "}
        {Math.min(currentPage * rowsPerPage, data.length)} of {data.length} entries
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        {/* Previous Button */}
        <button
          className={`px-4 py-2 bg-gray-200 rounded ${
            currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex space-x-2">
          {visiblePages.map((page, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } ${page === "..." ? "cursor-default" : ""}`}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`px-4 py-2 bg-gray-200 rounded ${
            currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
