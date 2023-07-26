import React from "react";
import { IArticle } from "../../shared/interfaces";
import { Link } from "react-router-dom";
import { formatTime } from "../../shared/utils";
interface ArticlePreviewProps {
  article: IArticle;
}
const ArticlePreview = ({ article }: ArticlePreviewProps) => {

  return (
    <div className="article-preview">
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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link
        to={`/articles/${article.slug}`}
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
      </Link>
    </div>
  );
};

export default ArticlePreview;
