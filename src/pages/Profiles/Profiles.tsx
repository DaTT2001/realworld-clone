import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Author, IArticle } from "../../shared/interfaces";
import { AUTHOR_DEFAULT } from "../../shared/constains";
import {
  followProfile,
  getArticlesByAuthor,
  getFavoritedArticlesByAuthor,
  getProfile,
  unFollowProfile,
} from "../../shared/api/api";
import Pagination from "../../components/Pagination/Pagination";
import { useRealWorld } from "../../DataContext/Provider";
import { useNavigate } from "react-router-dom";
import ArticleContainer from "../../components/ArticleContainer/ArticleContainer";

const Profiles = () => {
  const { state } = useRealWorld();
  const location = useLocation();
  const navigateTo = useNavigate();
  const currentPath = location.pathname;
  const [author, setAuthor] = useState<Author>(AUTHOR_DEFAULT);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [page, setPage] = useState(1);
  const [articleCount, setArticleCount] = useState(0);
  const [articleLoading, setArticleLoading] = useState(false);
  const [filter, setFilter] = useState<{
    filter: string;
    isFilterByTag: boolean;
    tag: string;
  }>({ filter: "My Articles", isFilterByTag: false, tag: "" });

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setArticleLoading(true);
        const response = await getProfile(currentPath);
        setAuthor(response.profile);
        setArticleLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    void fetchData();
  }, [currentPath]);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        setArticleLoading(true);
        let response: { articles: IArticle[]; articlesCount: number } = {
          articles: [],
          articlesCount: 0,
        };
        if (filter.filter === "My Articles" && author.username !== "") {
          response = await getArticlesByAuthor(author.username, page);
        } else if (
          filter.filter === "Favorited Articles" &&
          author.username !== ""
        ) {
          response = await getFavoritedArticlesByAuthor(author.username, page);
        }
        setArticles(response.articles);
        setArticleCount(response.articlesCount);
        setArticleLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [page, filter, author.username]);

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    if (state.user.username === author.username) {
      navigateTo("/setting");
    } else {
    }
  };
  const handleFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.isLogged && !author.following) {
      const res = await followProfile(author.username);
      setAuthor(res.profile);
    } else if (state.isLogged && author.following) {
      const res = await unFollowProfile(author.username);
      setAuthor(res.profile);
    } else {
      navigateTo("/login");
    }
  };
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
                <button
                  onClick={handleProfile}
                  className="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i className="ion-gear-a"></i>
                  &nbsp; Edit Profile Settings
                </button>
              ) : author.following ? (
                <>
                  <button
                    onClick={handleFollow}
                    className="btn btn-sm btn-secondary action-btn"
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp; Unfollow {author.username}
                  </button>
                  &nbsp;&nbsp;
                </>
              ) : (
                <>
                  <button
                    onClick={handleFollow}
                    className="btn btn-sm btn-outline-secondary action-btn"
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {author.username}
                  </button>
                  &nbsp;&nbsp;
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleContainer type="articles" articleCount={articleCount} articles={articles} isLogged = {state.isLogged} setFilter={setFilter} setPage={setPage} filter={filter} nav={['My Articles', 'Favorited Articles']} articleLoading = {articleLoading}/>
            {!articleLoading && (
              <Pagination
                page={page}
                articlesCount={articleCount}
                setPage={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
