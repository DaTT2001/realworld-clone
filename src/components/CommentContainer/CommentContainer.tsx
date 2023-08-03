/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react'
import { IComment, User } from '../../shared/interfaces'
import { Link } from 'react-router-dom'
import { deleteComment, postComment } from '../../shared/api/api'
import CommentCard from '../CommentCard/CommentCard'
interface CommentContainerProps {
    isLogged: boolean
    user: User
    currentPath: string
    initialComments: IComment[]
}
const CommentContainer = ({isLogged, user, currentPath, initialComments }: CommentContainerProps) => {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const [comment, setComment] = useState("");
    const [disabled, setDisabled] = useState(false);

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
      const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
      };
      
  return (
    <>
    {isLogged ? (
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
                <img src={user.image} className="comment-author-img" />
                <button disabled={disabled} type="submit" className="btn btn-sm btn-primary">
                  Post Comment
                </button>
              </div>
            </form>
            {comments.map((comment, index) => {
              return (
                <CommentCard comment={comment} handleDeleteComment={handleDeleteComment} user={user}/>
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
    </>
  )
}

export default CommentContainer