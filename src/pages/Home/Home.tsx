import React, { useEffect, useState } from "react";
import {
  getAllTagApi,
  getArticleByPage,
  getArticleByTag,
  getFeedArticles,
} from "../../shared/api/api";
import Pagination from "../../components/Pagination/Pagination";
import { IArticle } from "../../shared/interfaces";
import { useRealWorld } from "../../DataContext/Provider";
import TagList from "../../components/TagList/TagList";
import ArticleContainer from "../../components/ArticleContainer/ArticleContainer";

const Home = () => {
  const [allTag, setAllTag] = useState([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [articleLoading, setArticleLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [articleCount, setArticleCount] = useState(0);
  const { state } = useRealWorld();
  const [filter, setFilter] = useState<{
    filter: string;
    isFilterByTag: boolean;
    tag: string;
  }>({ filter: "", isFilterByTag: false, tag: "" });

  useEffect(() => {
    setFilter({
      ...filter,
      filter: state.isLogged ? "Your Feed" :"Global Feed",
    });
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
    async function fetchData(): Promise<void> {
      try {
        setArticleLoading(true);
        let response: { articles: IArticle[]; articlesCount: number } = {
          articles: [],
          articlesCount: 0,
        };
        if (
          state.isLogged && filter.filter === "Your Feed" &&
          !filter.isFilterByTag
        ) {
          response = await getFeedArticles(state.user.username, page);
        } else if (filter.filter === "Global Feed" && !filter.isFilterByTag) {
          response = await getArticleByPage(page);
        } else if (filter.isFilterByTag) {
          response = await getArticleByTag(page, filter.tag);
        }
        setArticles(response.articles);
        setArticleCount(response.articlesCount);
        setArticleLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [page, filter, state]);

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
          <ArticleContainer
            isLogged={state.isLogged}
            setFilter={setFilter}
            filter={filter}
            setPage={setPage}
            articleLoading= {articleLoading}
            articleCount={articleCount}
            articles={articles}
            nav={['Your Feed', 'Global Feed']}
            type="feed"
          />
          <TagList
            setFilter={setFilter}
            setPage={setPage}
            allTag={allTag}
            tagLoading={tagLoading}
          />
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
  );
};

export default Home;
