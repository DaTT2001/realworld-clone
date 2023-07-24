import React from 'react';

type PaginationProps = {
    page: number;
    articlesCount: number;
    handlePagination: (page: number) => void;
};

export default function Pagination( { page, articlesCount, handlePagination }: PaginationProps) {
    const pageNumbers = [];

    for (let i = 1; i < Math.ceil(articlesCount / 10) + 1  ; i++) {
        pageNumbers.push(i);
    }

    if (articlesCount <= 10) {
        return null;
    }

    return (
        <nav>
            <div className="pagination">
                {pageNumbers.map((number) => {
                    const isCurrent = number === page;
                    return (
                        <li
                            className={isCurrent ? 'page-item active' : 'page-item'}
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