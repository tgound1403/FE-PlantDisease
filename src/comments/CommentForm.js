import { useState } from "react";
const axios = require('axios');

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisable = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(text);
    handleSubmit(text);
    setText("");

    const payload = {
      username: "Trieu Duong",
      body: text,
      createdAt: Date.now(),
    };

    axios({
      url: '/api/comments',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('data has been sent to server');

      })
      .catch(() => {
        console.log('error sending comment to server');
      });

  };


  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="comment-form-button" disabled={isTextareaDisable}>
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Hủy
        </button>
      )}
    </form>
  );
};

export default CommentForm;
