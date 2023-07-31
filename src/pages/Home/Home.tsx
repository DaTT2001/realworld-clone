import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllTagApi,
  getArticleByPage,
  getArticleByTag,
  getArticlesByAuthor,
  getFeedArticles,
} from "../../shared/api/api";
import Pagination from "../../components/Pagination/Pagination";
import { IArticle } from "../../shared/interfaces";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import { useRealWorld } from "../../DataContext/Provider";

const Home = () => {
  const [allTag, setAllTag] = useState([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [articleCount, setArticleCount] = useState(0);
  const [tagFilter, setTagFilter] = useState<{
    isFilter: boolean;
    tag: string;
  }>({ isFilter: false, tag: "" });
  const { state } = useRealWorld();
  const [nav, setNav] = useState(state.isLogged);
  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setTagLoading(true);
        const response = await getAllTagApi();
        setAllTag(response.tags);
        setTagLoading(false);
      } catch {
        throw new Error("err");
      }
    }
    void fetchData();
  }, []);

  useEffect(() => {
    async function fetchDataFeed(): Promise<void> {
          setArticleLoading(true);
          const response = await getFeedArticles(state.user.username, page);
          setArticles(response.articles);
          setArticleCount(response.articlesCount);
          setArticleLoading(false);
      }
    async function fetchData(): Promise<void> {
      try {
        setArticleLoading(true);
        const response = await getArticleByPage(page);
        console.log(response);
        setArticles(response.articles);
        setArticleCount(response.articlesCount);
        setArticleLoading(false);
      } catch {}
    }
    async function fetchDataTag(): Promise<void> {
      try {
        setArticleLoading(true);
        const response = await getArticleByTag(page, tagFilter.tag);
        console.log(response);
        setArticles(response.articles);
        setArticleCount(response.articlesCount);
        setArticleLoading(false);
      } catch {}
    }
    if (!tagFilter.isFilter && !nav) {
      void fetchData();
    } else if (!tagFilter.isFilter && nav){
      void fetchDataFeed();
    } else {
       void fetchDataTag();
    }
  }, [page, tagFilter]);

  const handlePagination = (page: number): void => {
    setPage(page);
  };

  const handleFilterByTag = (tag: string): void => {
    setTagFilter({ isFilter: true, tag: tag });
    setPage(1);
  };

  const handleGlobalFeed = (): void => {
    setTagFilter({ isFilter: false, tag: "" });
    setPage(1);
    setNav(false);
  };
  const handleYourFeed = (): void => {
    setTagFilter({ isFilter: false, tag: "" });
    setPage(1);
    setNav(true);
  };
  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {state.isLogged && (
                  <li className="nav-item">
                    <Link
                      onClick={() => handleYourFeed()}
                      className={`nav-link ${
                        tagFilter.isFilter ? "" : nav ? "active" : ""
                      }`}
                      to=""
                    >
                      Your Feed
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <Link
                    onClick={() => handleGlobalFeed()}
                    className={`nav-link ${
                      tagFilter.isFilter ? "" : nav ? "" : "active"
                    }`}
                    to=""
                  >
                    Global Feed
                  </Link>
                </li>

                {tagFilter.isFilter && (
                  <li className="nav-item">
                    <Link className="nav-link active" to="">
                      #{tagFilter.tag}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            {articleLoading ? (
              <div className="article-preview">Loading Articles...</div>
            ) : (
                articleCount === 0 ? (
                    <div className="article-preview">
                      No articles are here... yet.
                    </div>
                  ) : 
              articles.map((article, index) => {
                return (
                  <div key={index}>
                    <ArticlePreview article={article} />
                  </div>
                );
              })
            )}
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>

              <div className="tag-list">
                {tagLoading ? (
                  <p>Loading tags...</p>
                ) : (
                  allTag.map((tag, index) => {
                    return (
                      <Link
                        to=""
                        onClick={() => handleFilterByTag(tag)}
                        className="tag-default tag-pill"
                        key={index}
                      >
                        {tag}
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          {!articleLoading && (
            <Pagination
              page={page}
              articlesCount={articleCount}
              handlePagination={handlePagination}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
