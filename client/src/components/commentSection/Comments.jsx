import { useState, useEffect } from "react";
import cl from './Comments.module.css'
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../../api";
import axios from "axios";
import Cookies from "js-cookie";

const Comments = ({ commentsUrl, currentUserId, postId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === postId
  );
  const getReplies = async (commentId) => {
    try {
      const token = Cookies.get('token')
      const response = await axios.post('http://localhost:1415/questions', {post_id: commentId}, {
        headers: {
          'Authorization': 'Bearer ' + token 
        },
      })
      const backendComments = response.data.questions;
      // console.log(backendComments)
  
      return response.data.questions;
    } catch (error) {
      console.error('Error fetching replies:', error);
      return []; // Return an empty array if there's an error or no replies found
    }
  };
  const addComment = (text, parentId) => {
    // const token = Cookies.get('token')
    // axios.post('http://localhost:1415/question', {text, post_id: parentId}, {
    //   headers: {
    //     'Authorization': 'Bearer ' + token 
    //   },
    // }).then((res) => {
    //   setBackendComments([res.data.newQuestion, ...backendComments]);
    //   setActiveComment(null);
    // });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Вы уверены, что хотите удалить комментарий?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  // useEffect(() => {
  //   const token = Cookies.get('token')
  //   axios.post('http://localhost:1415/questions', {post_id: postId}, {
  //     headers: {
  //       'Authorization': 'Bearer ' + token 
  //     },
  //   }).then((res) => {
  //     setBackendComments(res.data.questions);
  //   });
  // }, []);

  return (
    <div className={cl.comments}>
      <h3 className={cl.comments__title}>Комментарии</h3>
      <div className={cl.comment__form__title}>Напишите комментарии</div>
      <CommentForm submitLabel="Отправить" handleSubmit={addComment} post_id={postId} />
      <div className={cl.comments__container}>
        {/* {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            commentID={rootComment.id}
            comment={rootComment}
            // replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
            load={true}
          />
        ))} */}
      </div>
    </div>
  );
};

export default Comments;