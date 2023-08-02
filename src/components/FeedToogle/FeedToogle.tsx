import React from "react";
import { Link } from "react-router-dom";
interface FeedToogleProps {
  isLogged: boolean;
  setFilter: (filter: {
    filter: string;
    isFilterByTag: boolean;
    tag: string;
  }) => void;
  filter: {
    filter: string;
    isFilterByTag: boolean;
    tag: string;
  };
  setPage: (page: number) => void;
  nav: string[];
  type: string
}
const FeedToogle = ({
  isLogged,
  setFilter,
  filter,
  setPage,
  nav,
  type
}: FeedToogleProps) => {
  const handleFeed = (filter: string): void => {
    setFilter({ isFilterByTag: false, tag: "", filter: filter });
    setPage(1);
  };
  return (
    <div className={`${type}-toggle`}>
      <ul className="nav nav-pills outline-active">
        {isLogged && (
          <li className="nav-item">
            <Link
              onClick={() => handleFeed(nav[0])}
              className={`nav-link ${
                filter.isFilterByTag
                  ? ""
                  : filter.filter === nav[0]
                  ? "active"
                  : ""
              }`}
              to=""
            >
              {nav[0]}
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link
            onClick={() => handleFeed(nav[1])}
            className={`nav-link ${
              filter.isFilterByTag
                ? ""
                : filter.filter === nav[1]
                ? "active"
                : ""
            }`}
            to=""
          >
            {nav[1]}
          </Link>
        </li>

        {filter.isFilterByTag && (
          <li className="nav-item">
            <Link className="nav-link active" to="">
              #{filter.tag}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToogle;
