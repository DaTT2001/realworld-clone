/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getAllComment,
  getArticleDetail,
} from "../../shared/api/api";
import { Author, IArticle, IComment } from "../../shared/interfaces";
import { ARTICLE_DEFAULT, AUTHOR_DEFAULT } from "../../shared/constains";
import { formatTime } from "../../shared/utils";
import { useRealWorld } from "../../DataContext/Provider";
import FollowBtn from "../../components/Button/FollowBtn/FollowBtn";
import FavoriteBtn from "../../components/Button/FavoriteBtn/FavoriteBtn";
import CommentContainer from "../../components/CommentContainer/CommentContainer";
import EditArticle from "../../components/Button/EditArticle/EditArticle";


const ArticleDetail = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [article, setArticle] = useState<IArticle>(ARTICLE_DEFAULT);
  const [comments, setComments] = useState<IComment[]>([]);
  const { state } = useRealWorld();
  const [author, setAuthor] = useState<Author>(AUTHOR_DEFAULT);
  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const response = await getArticleDetail(currentPath);
        setArticle(response.article);
        setAuthor(response.article.author);
        const res = await getAllComment(currentPath);
        setComments(res.comments);
      } catch (err) {
        navigateTo('/')
      }
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
              <Link
                to={`/profiles/${article.author.username}`}
                className="author"
              >
                {article.author.username}
              </Link>
              <span className="date">{formatTime(article.createdAt)}</span>
            </div>
            {state.user.username === article.author.username ? (
              <EditArticle slug={article.slug}/>
            ) : (
              <>
                <FollowBtn setAuthor={setAuthor} isLogged={state.isLogged} username={article.author.username} following ={author.following}/>
                <FavoriteBtn slug={article.slug} isLogged={state.isLogged} setArticle={setArticle} isFavorited = {article.favorited} favoritesCount={article.favoritesCount}/>
              </>
            )}
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
              <span className="date">{formatTime(article.createdAt)}</span>
            </div>
            {state.user.username === article.author.username ? (
              <EditArticle slug={article.slug}/>
            ) : (
              <>
                <FollowBtn setAuthor={setAuthor} isLogged={state.isLogged} username={article.author.username} following ={author.following}/>
                <FavoriteBtn slug={article.slug} isLogged={state.isLogged} setArticle={setArticle} isFavorited = {article.favorited} favoritesCount={article.favoritesCount}/>
              </>
            )}
          </div>
        </div>
        <CommentContainer initialComments={comments} isLogged={state.isLogged} user={state.user} currentPath={currentPath}/>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ArticleDetail;
