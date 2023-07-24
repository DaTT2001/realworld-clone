import React from "react";
import { IArticlePreview } from "../../shared/interfaces";
import { Link } from "react-router-dom";
interface ArticlePreviewProps {
  article: IArticlePreview;
}
const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to="/profile/eric-simons">
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link to="/profile/eric-simons" className="author">
            {article.author.username}
          </Link>
          <span className="date">January 20th</span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a
        href="/article/how-to-build-webapps-that-scale"
        className="preview-link"
      >
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag, index) => {
            return (
              <li key={index} className="tag-default tag-pill tag-outline">
                {tag}
              </li>
            );
          })}
        </ul>
      </a>
    </div>
  );
};

export default ArticlePreview;
