/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteArticle,
  deleteComment,
  favoriteArticle,
  followProfile,
  getAllComment,
  getArticleDetail,
  postComment,
  unFavoriteArticle,
  unFollowProfile,
} from "../../shared/api/api";
import { Author, IArticle, IComment } from "../../shared/interfaces";
import { ARTICLE_DEFAULT, AUTHOR_DEFAULT } from "../../shared/constains";
import { formatTime } from "../../shared/utils";
import { useRealWorld } from "../../DataContext/Provider";


const ArticleDetail = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [article, setArticle] = useState<IArticle>(ARTICLE_DEFAULT);
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState("");
  const { state } = useRealWorld();
  const [author, setAuthor] = useState<Author>(AUTHOR_DEFAULT);
  const [disabled, setDisabled] = useState(false)
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

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setDisabled(true)
      const res = await postComment(currentPath, comment);
      setComments([...comments, res.comment]);
      setComment("");
      setDisabled(false)
    }
    catch (err) {
      console.log(err)
      setDisabled(false)
    }
  };
  const handleDeleteComment = async (id: number) => {
    const res = await deleteComment(currentPath, id);
    setComments(comments.filter((comment) => comment.id !== id));
  };
  const handleDeleteArticle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      await deleteArticle(article.slug);
      navigateTo("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.isLogged && !article.favorited) {
      const res = await favoriteArticle(article.slug);
      setArticle(res.article);
    } else if (state.isLogged && article.favorited) {
      const res = await unFavoriteArticle(article.slug);
      setArticle(res.article);
    } else {
      navigateTo("/login");
    }
  };
  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.isLogged && !author.following) {
      const res = await followProfile(author.username);
      setAuthor(res.profile)
    } else if (state.isLogged && author.following) {
      const res = await unFollowProfile(author.username);
      setAuthor(res.profile)
    } else {
      navigateTo("/login");
    }
  };
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
              <>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i>{" "}
                  <Link to={`/editor/${article.slug}`}>Edit Article</Link>
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={handleDeleteArticle}
                  className="btn btn-sm btn-outline-danger"
                >
                  <i className="ion-trash-a"></i>  Delete Article
                </button>
                &nbsp;&nbsp;
              </>
            ) : (
              <>
                {author.following ? (
                  <>
                    <button onClick={handleFollow} className="btn btn-sm btn-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Unfollow {article.author.username}
                    </button>
                    &nbsp;&nbsp;
                  </>
                ) : (
                  <>
                    <button onClick={handleFollow} className="btn btn-sm btn-outline-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow {article.author.username}
                    </button>
                    &nbsp;&nbsp;
                  </>
                )}
                {article.favorited ? (
                  <button
                    onClick={handleFavorite}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="ion-heart"></i>
                    &nbsp; Unfavorite Post (
                    <span className="counter">{article.favoritesCount}</span>)
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Post (
                    <span className="counter">{article.favoritesCount}</span>)
                  </button>
                )}
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
              <span className="date">January 20th</span>
            </div>
            {state.user.username === article.author.username ? (
              <>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-edit"></i> Edit Article
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={handleDeleteArticle}
                  className="btn btn-sm btn-outline-danger"
                >
                  <i className="ion-trash-a"></i> Delete Article
                </button>
                &nbsp;&nbsp;
              </>
            ) : (
              <>
                {author.following ? (
                  <>
                    <button onClick={handleFollow} className="btn btn-sm btn-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Unfollow {article.author.username}
                    </button>
                    &nbsp;&nbsp;
                  </>
                ) : (
                  <>
                    <button onClick={handleFollow} className="btn btn-sm btn-outline-secondary">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow {article.author.username}
                    </button>
                    &nbsp;&nbsp;
                  </>
                )}

                {article.favorited ? (
                  <button
                    onClick={handleFavorite}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="ion-heart"></i>
                    &nbsp; Unfavorite Post (
                    <span className="counter">{article.favoritesCount}</span>)
                  </button>
                ) : (
                  <button
                    onClick={handleFavorite}
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Post (
                    <span className="counter">{article.favoritesCount}</span>)
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {state.isLogged ? (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form
                onSubmit={handleSubmitComment}
                className="card comment-form"
              >
                <div className="card-block">
                  <textarea
                    value={comment}
                    onChange={handleComment}
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                    disabled={disabled}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img src={state.user.image} className="comment-author-img" />
                  <button disabled={disabled} type="submit" className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>
              {comments.map((comment, index) => {
                return (
                  <div className="card" key={index}>
                    <div className="card-block">
                      <p className="card-text">{comment.body}</p>
                    </div>
                    <div className="card-footer">
                      <Link
                        to={`/profiles/${comment.author.username}`}
                        className="comment-author"
                      >
                        <img
                          src={`${comment.author.image}`}
                          className="comment-author-img"
                        />
                      </Link>
                      &nbsp;
                      <Link
                        to={`/profiles/${comment.author.username}`}
                        className="comment-author"
                      >
                        {comment.author.username}
                      </Link>
                      <span className="date-posted">
                        {formatTime(comment.createdAt)}
                      </span>
                      {
                        comment.author.username === state.user.username && 
                        <span className="mod-options">
                        <i
                          onClick={() => handleDeleteComment(comment.id)}
                          className="ion-trash-a"
                        ></i>
                      </span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ArticleDetail;
