import { useSelector } from "react-redux";
import { useState } from "react";
const axios = require("axios");
const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = "",
  handleCancel,
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisable = text.length === 0;
  const { currentUser } = useSelector((state) => state.user);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(text);
    handleSubmit(text);
    setText("");

    const payload = {
      username: `${currentUser.name}`,
      body: text,
      createdAt: Date.now(),
    };

    axios({
      url: `${
        process.env.BACKEND_API_URL ||
        "https://desolate-everglades-44147.herokuapp.com"
      }/api/comments`,
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("data has been sent to server");
      })
      .catch((err) => {
        console.log(err.message);
        console.log("error sending comment to server");
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
