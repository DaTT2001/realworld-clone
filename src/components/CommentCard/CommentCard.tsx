/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { IComment, User } from "../../shared/interfaces";
import { formatTime } from "../../shared/utils";
interface CommentCardProps {
    comment: IComment
    handleDeleteComment : (id: number) => void
    user: User
}
const CommentCard = ({comment, handleDeleteComment, user}: CommentCardProps) => {
    
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/profiles/${comment.author.username}`}
          className="comment-author"
        >
          <img src={`${comment.author.image}`} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link
          to={`/profiles/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{formatTime(comment.createdAt)}</span>
        {comment.author.username === user.username && (
          <span className="mod-options">
            <i
              onClick={() => handleDeleteComment(comment.id)}
              className="ion-trash-a"
            ></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
