
import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../api/commentAPI.js";

const axios = require('axios');


const Comments = ({ commentsUrl, currentUserId, closeModal }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);

  const [comments, setComments] = useState([]);
  // const rootComments = backendComments.filter(
  //   (backendComment) => backendComment.parentId === null
  // );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
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
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  const getComments = () => {
    axios.get('/api/comments')
      .then((response) => {
        let data = response.data;
        data = data.reverse()
        setComments(data);
        console.log("Comment has been received");
        console.log(data);
      })
      .catch((error) => {
        alert('Error while getting comments')
        console.log(error);
      });
  }

  const displayComments = (comments) => {

    if (!comments.length) return null;

    return comments.map((comment, index) => (
      <Comment
        key={index}
        comment={comment}
        replies={getReplies(comment.id)}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        addComment={addComment}
        deleteComment={deleteComment}
        updateComment={updateComment}
        currentUserId={currentUserId}
      />
    ))
  }

  useEffect(() => {
    // getCommentsApi().then((data) => {
    //   setBackendComments(data);
    // });
    getComments();
  }, []);

  return (
    <div className="comments">
      <div className="comment-section-header">
        <h3 className="comments-title">Bình luận</h3>
      </div>
      <CommentForm submitLabel="Bình luận" handleSubmit={addComment} />
      <div className="comments-container">
        {displayComments(comments)}
      </div>
    </div>
  );
};

export default Comments;
