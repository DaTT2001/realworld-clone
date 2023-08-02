import React from "react";

interface PaginationProps  {
  page: number;
  articlesCount: number;
  setPage: (page: number) => void;
};

export default function Pagination({
  page,
  articlesCount,
  setPage
}: PaginationProps) {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(articlesCount / 10) + 1; i++) {
    pageNumbers.push(i);
  }

  if (articlesCount <= 10) {
    return null;
  }
  const handlePagination = (page: number): void => {
    setPage(page);
  };
  return (
    <nav>
      <div className="pagination">
        {pageNumbers.map((number) => {
          const isCurrent = number === page;
          return (
            <li
              className={isCurrent ? "page-item active" : "page-item"}
              onClick={() => handlePagination(number)}
              key={number}
            >
              <button className="page-link">{number}</button>
            </li>
          );
        })}
      </div>
    </nav>
  );
}
