import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteArticle } from "../../../shared/api/api";
interface EditArticleProps {
    slug: string
}
const EditArticle = ({slug}: EditArticleProps) => {
  const navigateTo = useNavigate()
  const handleEditArticle = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    navigateTo(`/editor/${slug}`)
  };
  const handleDeleteArticle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    try {
      await deleteArticle(slug);
      navigateTo("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button onClick={handleEditArticle} className="btn btn-sm btn-outline-secondary">
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
  );
};

export default EditArticle;
