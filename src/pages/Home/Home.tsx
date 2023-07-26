import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllTagApi, getArticleByPage, getArticleByTag } from "../../shared/api/api";
import Pagination from "../../components/Pagination/Pagination";
import { IArticle } from "../../shared/interfaces";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
const Home = () => {
    const [allTag, setAllTag] = useState([]);
    const [tagLoading, setTagLoading] = useState(false);
    const [articleLoading, setArticleLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState<IArticle[]>([]);
    const [articleCount, setArticleCount] = useState(0)
    const [tagFilter, setTagFilter] = useState<{isFilter: boolean, tag: string}>({isFilter: false, tag :''});

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                setTagLoading(true);
                const response = await getAllTagApi();
                setAllTag(response.tags);
                setTagLoading(false);
            } catch {
                throw new Error('err')
            }
        }
        void fetchData();
    }, []);

    useEffect(() => {
        async function fetchData(): Promise<void> {
            try {
                setArticleLoading(true);
                const response = await getArticleByPage(page);
                console.log(response);
                setArticles(response.articles);
                setArticleCount(response.articlesCount);
                setArticleLoading(false);
            } catch { }
        }
        async function fetchDataTag(): Promise<void> {
            try {
                setArticleLoading(true);
                const response = await getArticleByTag(page, tagFilter.tag);
                console.log(response);
                setArticles(response.articles);
                setArticleCount(response.articlesCount);
                setArticleLoading(false);
            } catch { }
        }
        if(!tagFilter.isFilter) {
            void fetchData();
        } else {
            void fetchDataTag();
        }
    }, [page, tagFilter]);

    const handlePagination = (page: number): void => {
        setPage(page);
    };

    const handleFilterByTag = (tag: string): void => {
        setTagFilter({isFilter: true, tag: tag});
        setPage(1);
    };

    const handleGlobalFeed = (): void => {
        setTagFilter({isFilter: false, tag:''});
        setPage(1);
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
                                <li className="nav-item">
                                    <Link onClick={() => handleGlobalFeed()} className={`nav-link ${tagFilter.isFilter ? ''  : 'active'}`}
                                    to="">
                                        Global Feed
                                    </Link>
                                </li>
                                {
                                    tagFilter.isFilter && 
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="">
                                                #{tagFilter.tag}
                                            </Link>
                                        </li>
                                }
                                
                            </ul>
                        </div>
                        {
                        articleLoading ? (<div className="article-preview">Loading Articles...</div>) :
                        
                        (articles.map((article, index) => {
                            return (
                                <div key={index}>
                                    <ArticlePreview article={article}/>
                                </div>
                            );
                        }))
                        }
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
                                            <Link to="" onClick={() => handleFilterByTag(tag)} className="tag-default tag-pill" key={index}>
                                                {tag}
                                            </Link>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                    {!articleLoading && <Pagination
                        page={page}
                        articlesCount={articleCount}
                        handlePagination={handlePagination}
                    />}
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
