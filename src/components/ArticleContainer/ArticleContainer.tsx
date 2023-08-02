import React from 'react'
import FeedToogle from '../FeedToogle/FeedToogle';
import { IArticle } from '../../shared/interfaces';
import ArticlePreview from '../ArticlePreview/ArticlePreview';
interface ArticleContainerProps {
    isLogged: boolean;
    setFilter: (filter: {filter: string, isFilterByTag: boolean, tag: string}) => void ; 
    filter: {
        filter: string,
        isFilterByTag: boolean,
        tag: string
    }
    setPage: (page: number) => void
    articleLoading: boolean
    articleCount:number
    articles: IArticle[]
    nav: string[]
    type: string
}
const ArticleContainer = ({isLogged, setFilter, filter, setPage, articleLoading, articleCount, articles, nav, type}: ArticleContainerProps) => {
  return (
    <div className={type === 'articles' ? "col-xs-12 col-md-10 offset-md-1" :"col-md-9"}>
            <FeedToogle
              isLogged={isLogged}
              setFilter={setFilter}
              filter={filter}
              setPage={setPage}
              nav={nav}
              type={type}
            />
            {articleLoading ? (
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
          </div>
  )
}

export default ArticleContainer