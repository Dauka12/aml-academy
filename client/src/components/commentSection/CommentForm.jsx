import React, { useState } from "react";
import styles from "./CommentForm.module.css";
import Button from "../UI/button/Button";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  post_id
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text, post_id);
    setText("");
  };
  return (
    <form onSubmit={onSubmit} className={styles.comment__form}>
      <textarea
        className={styles.comment__form__textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        className={styles.comment__form__button}
        disabled={isTextareaDisabled}
      >
        {submitLabel}
      </Button>
      {hasCancelButton && (
        <Button
          type="button"
          className={`${styles.comment__form__button} ${styles.comment__form__cancel__button}`}
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default CommentForm;
