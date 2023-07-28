import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Author, IArticle } from "../../shared/interfaces";
import { AUTHOR_DEFAULT } from "../../shared/constains";
import {
  getArticlesByAuthor,
  getFavoritedArticlesByAuthor,
  getProfile,
} from "../../shared/api/api";
import { Link } from "react-router-dom";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import Pagination from "../../components/Pagination/Pagination";
import { useRealWorld } from "../../DataContext/Provider";
import { useNavigate } from "react-router-dom"

const Profiles = () => {
  const { state } = useRealWorld();
  const location = useLocation();
  const navigateTo = useNavigate();
  const currentPath = location.pathname;
  const [author, setAuthor] = useState<Author>(AUTHOR_DEFAULT);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const [nav, setNav] = useState("");

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setLoading(true);
        const response = await getProfile(currentPath);
        setAuthor(response.profile);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    void fetchData();
  }, [currentPath]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      if (author.username !== "") {
        setLoading(true);
        const response = await getArticlesByAuthor(author.username, page);
        setArticles(response.articles);
        setArticleCount(response.articlesCount);
        setLoading(false);
      }
    }

    async function fetchDataFavorited(): Promise<void> {
      if (author.username !== "") {
        setLoading(true);
        const response = await getFavoritedArticlesByAuthor(
          author.username,
          page
        );
        console.log(response);
        setArticles(response.articles);
        setArticleCount(response.articlesCount);
        setLoading(false);
      }
    }

    if (nav === "") {
      void fetchData();
    } else {
      void fetchDataFavorited();
    }
  }, [author.username, page, nav]);

  const handlePagination = (page: number): void => {
    setPage(page);
  };

  const handleArticleTab = (): void => {
    setPage(1);
    setNav("");
  };

  const handleFavouritedTab = (): void => {
    setPage(1);
    setNav(author.username);
  };
  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if(state.user.username === author.username) {
      navigateTo('/setting');
    } else {
      // follow
    }
  }
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={author.image} className="user-img" />
              <h4>{author.username}</h4>
              <p>{author.bio}</p>
              {state.user.username === author.username ? (
                <button onClick={handleProfile} className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
              ) : (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {author.username}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <Link
                    onClick={() => handleArticleTab()}
                    className={`nav-link ${nav !== "" ? "" : "active"}`}
                    to=""
                  >
                    My Articles
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => handleFavouritedTab()}
                    className={`nav-link ${nav === "" ? "" : "active"}`}
                    to=""
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>
            {loading ? (
              <div className="article-preview">Loading Articles...</div>
            ) : articleCount === 0 ? (
              <div className="article-preview">
                No articles are here... yet.
              </div>
            ) : (
              articles.map((article, index) => {
                return (
                  <div key={index}>
                    <ArticlePreview article={article} />
                  </div>
                );
              })
            )}

            {!loading && (
              <Pagination
                page={page}
                articlesCount={articleCount}
                handlePagination={handlePagination}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
