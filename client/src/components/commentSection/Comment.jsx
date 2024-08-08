import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import styles from './Comment.module.css';
import userIcon from '../../assets/images/user-icon.png';
import Cookies from "js-cookie";
import axios from "axios";
const Comment = ({
  key,
  comment,
  // replies,
  // commentID,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
  load
}) => {
  const [replies, setReplies] = useState([])
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const fiveMinutes = 300000;
  const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId && !timePassed;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  useEffect(() => {
    if (load) {

      const token = Cookies.get('token')
      axios.post('http://localhost:1415/questions', {post_id: comment.id}, {
        headers: {
          'Authorization': 'Bearer ' + token 
        },
      }).then((res) => {
        setReplies(res.data.questions)
      })
      
    }
  }, [])
  return (
    <div key={comment.id} className={styles.comment}>
      <div className={styles.comment__image__container}>
        <img src={userIcon} alt="User Icon" className={styles.img} />
      </div>
      <div className={styles.comment__right__part}>
        <div className={styles.comment__content}>
          <div className={styles.comment__author}>{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        {!isEditing && <div className={styles.comment__text}>{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        <div className={styles.comment__actions}>
          {canReply && (
            <div
              className={styles.comment__action}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Ответить
            </div>
          )}
          {canEdit && (
            <div
              className={styles.comment__action}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Изменить
            </div>
          )}
          {canDelete && (
            <div
              className={styles.comment__action}
              onClick={() => deleteComment(comment.id)}
            >
              Удалить
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
          />
        )}
        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
