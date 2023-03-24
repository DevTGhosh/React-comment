import React, { useState, useRef, useEffect } from "react";
import "./Comment.css";

const Comment = ({
  id,
  children,
  onSaveComment,
  activeComment,
  setActiveComment,
  showComment,
  handleShowComment
}) => {
  const [commentText, setCommentText] = useState("");
  const commentRef = useRef(null);

  const handleClick = (e) => {
    e.stopPropagation();
    setActiveComment(id);
    handleShowComment(id, true);
  };

  const handleCloseComment = (e) => {
    if (commentRef.current && !commentRef.current.contains(e.target)) {
      setActiveComment(null);
      handleShowComment(id, false);
    }
  };

  const handleSaveComment = () => {
    onSaveComment(id, commentText);
    setCommentText("");
    setActiveComment(null);
    handleShowComment(id, false);
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseComment);
    return () => {
      document.removeEventListener("click", handleCloseComment);
    };
  }, []);

  return (
    <div
      className="comment-container"
      onMouseEnter={() => setActiveComment(id)}
      onMouseLeave={() => {
        setActiveComment(null);
      }}
      onClick={handleClick}
    >
      <div className={`comment-target`} data-id={id}>
        {activeComment === id && <span className="plus-icon">+</span>}
        {children}
      </div>
      {showComment?.[id] && (
        <div className="comment-box" ref={commentRef}>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add your comment"
          />
          <button className="save-button" onClick={handleSaveComment}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
