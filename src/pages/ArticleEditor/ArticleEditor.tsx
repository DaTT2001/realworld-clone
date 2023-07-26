import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getArticleDetail } from "../../shared/api/api";
import { IArticle } from "../../shared/interfaces";
import { ARTICLE_DEFAULT } from "../../shared/constains";
import { formatTime } from "../../shared/utils";

const ArticleEditor = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [article, setArticle] = useState<IArticle>(ARTICLE_DEFAULT);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await getArticleDetail(currentPath);
      console.log(response.article);
      setArticle(response.article);
    }
    void fetchData();
  }, [currentPath]);

  return article !== ARTICLE_DEFAULT ? (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <Link to={`/profiles/${article.author.username}`}>
              <img src={article.author.image} />
            </Link>
            <div className="info">
              <Link to={`/profiles/${article.author.username}`} className="author">
                {article.author.username}
              </Link>
              <span className="date">{formatTime(article.createdAt)}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post (
              <span className="counter">{article.favoritesCount}</span>)
            </button>
            {/* <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
            <button className="btn btn-sm btn-outline-danger">
              <i className="ion-trash-a"></i> Delete Article
            </button> */}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.body}</p>
            <ul className="tag-list">
              {article.tagList.map((tag, index) => {
                return (
                  <li key={index} className="tag-default tag-pill tag-outline">
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to="profile.html">
              <img src={article.author.image} />
            </Link>
            <div className="info">
              <Link to="" className="author">
                {article.author.username}
              </Link>
              <span className="date">January 20th</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article.author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Article{" "}
              <span className="counter">({article.favoritesCount})</span>
            </button>
            {/* <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-edit"></i> Edit Article
            </button>
            <button className="btn btn-sm btn-outline-danger">
              <i className="ion-trash-a"></i> Delete Article
            </button> */}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <p show-authed="false">
              <Link ui-sref="app.login" to="/login">
                Sign in
              </Link>{" "}
              or{" "}
              <Link ui-sref="app.register" to="/register">
                sign up
              </Link>{" "}
              to add comments on this article.
            </p>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea
                  className="form-control"
                  placeholder="Write a comment..."
                  rows={3}
                ></textarea>
              </div>
              <div className="card-footer">
                <img
                  src="http://i.imgur.com/Qr71crq.jpg"
                  className="comment-author-img"
                />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a to="/profile/author" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a to="/profile/jacob-schmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
              </div>
              <div className="card-footer">
                <a to="/profile/author" className="comment-author">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                </a>
                &nbsp;
                <a to="/profile/jacob-schmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-trash-a"></i>
                </span>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ArticleEditor;
