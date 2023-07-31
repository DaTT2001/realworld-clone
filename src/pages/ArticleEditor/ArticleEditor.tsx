import React, {useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IArticle } from "../../shared/interfaces";
import { ARTICLE_DEFAULT } from "../../shared/constains";
import { editArticle, getArticleDetail, postNewArticle } from "../../shared/api/api";

const ArticleEditor = () => {
  const navigateTo = useNavigate()
  const location = useLocation();
  const currentPath = location.pathname;
  const articleName = currentPath.slice(8);
  const [article, setArticle] = useState<IArticle>(ARTICLE_DEFAULT);
  const [isError, setIsError] = useState(false);
  const [tag, setTag] = useState("");
  const [disabled, setDisabled] = useState(false)
  
  useEffect(() => {
    async function fetchData(): Promise<void> {
      const response = await getArticleDetail(`articles/${articleName}`);
      setArticle(response.article);
    }
    if (articleName !== "create") {
      void fetchData();
    } else {
      setArticle(ARTICLE_DEFAULT);
    }
  }, [currentPath]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setIsError(false);
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };
  const handlePublishArticle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        setDisabled(true)
        if(articleName === 'create') 
        {
            const res = await postNewArticle(article.title, article.description, article.body, article.tagList);
            navigateTo(`/articles/${res.article.slug}`);
        } else {
            const res = await editArticle(article.title, article.description, article.body, article.tagList, articleName);
            navigateTo(`/articles/${res.article.slug}`);
        }
    }
    catch(err) {
        setIsError(true)
        setDisabled(false);
    }
  };
  const handleEnterTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
        if(article.tagList.includes(tag) || tag.trim() === '') {
            setTag("")
            return
        }
        setArticle((prevArticle) => ({
            ...prevArticle,
            tagList: [...prevArticle.tagList, tag],
          }));
          setTag("");
    }
  };
  const handleDeleteTag = (
    e: React.MouseEvent<HTMLSpanElement>,
    index: number
  ) => {
    setArticle((prevArticle) => ({
      ...prevArticle,
      tagList: [
        ...prevArticle.tagList.slice(0, index),
        ...prevArticle.tagList.slice(index + 1),
      ],
    }));
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {
                isError && 
                <ul className="error-messages">
                    <li>That title is required</li>
                </ul>
            }
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                  disabled={disabled}
                    onChange={handleInputChange}
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    name="title"
                    value={article.title}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                  disabled={disabled}
                    onChange={handleInputChange}
                    name="description"
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={article.description}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                  disabled={disabled}
                    onChange={handleInputChange}
                    name="body"
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={article.body}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                  disabled={disabled}
                    onKeyUp={handleEnterTag}
                    name="tagList"
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    onChange={(e) => setTag(e.target.value)}
                    value={tag}
                  />
                  <div className="tag-list">
                    {article.tagList.map((tag, index) => (
                      <span key={index} className="tag-default tag-pill">
                        {" "}
                        <i
                          onClick={(e) => handleDeleteTag(e, index)}
                          className="ion-close-round"
                        ></i>{" "}
                        {tag}{" "}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  onClick={handlePublishArticle}
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;
