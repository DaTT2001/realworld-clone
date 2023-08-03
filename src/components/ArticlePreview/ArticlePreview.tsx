/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { IArticle } from "../../shared/interfaces";
import { Link } from "react-router-dom";
import { formatTime } from "../../shared/utils";
import { useRealWorld } from "../../DataContext/Provider";
import { useNavigate } from "react-router-dom"
import { favoriteArticle, unFavoriteArticle } from "../../shared/api/api";

interface ArticlePreviewProps {
  article: IArticle;
}
const ArticlePreview = ({ article }: ArticlePreviewProps) => {
  const [currentArticle, setCurrentArticle] = useState<IArticle>(article)
  const [isDisabled, setIsDisable] = useState(false)
  const navigateTo = useNavigate()
  const { state } = useRealWorld()
  const handleFavorite = async (e : React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if(state.isLogged && !currentArticle.favorited) {
      setIsDisable(true)
      const res = await favoriteArticle(article.slug)
      setCurrentArticle(res.article)
      setIsDisable(false)
    } else if (state.isLogged && currentArticle.favorited) {
      setIsDisable(true)
      const res = await unFavoriteArticle(article.slug)
      setCurrentArticle(res.article)
      setIsDisable(false)
    }
    else {
      navigateTo('/login')
    }
  }
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profiles/${currentArticle.author.username}`}>
          <img src={currentArticle.author.image} />
        </Link>
        <div className="info">
          <Link to={`/profiles/${currentArticle.author.username}`} className="author">
            {currentArticle.author.username}
          </Link>
          <span className="date">{formatTime(currentArticle.createdAt)}</span>
        </div>
        <button disabled={isDisabled} onClick={handleFavorite} className={`btn btn-sm pull-xs-right ${currentArticle.favorited ? 'btn-primary': 'btn-outline-primary'} `}>
          <i className="ion-heart"></i> {currentArticle.favoritesCount}
        </button>
      </div>
      <Link
        to={`/articles/${currentArticle.slug}`}
        className="preview-link"
      >
        <h1>{currentArticle.title}</h1>
        <p>{currentArticle.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {currentArticle.tagList.map((tag, index) => {
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
