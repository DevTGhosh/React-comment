import React, { useState } from "react";
import Comment from "./Comment";
import "./App.css";

function App() {
  const [comments, setComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [showComment, setShowComment] = useState({});

  const handleSaveComment = (id, text, parentId = null) => {
    if (parentId === null) {
      setComments([...comments, { id, text, replies: [] }]);
    } else {
      const updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          comment.replies.push({ id, text, replies: [] });
        }
        return comment;
      });
      setComments(updatedComments);
    }
  };

  const handleShowComment = (id, bool) => {
    setShowComment({ [id]: bool });
  };

  const renderComments = (commentList) =>
    commentList.map(({ id, text, replies }) => (
      <React.Fragment key={id}>
        <div className="comment-item">
          Comment {id}: {text}
        </div>
        {replies.length > 0 && (
          <div className="comment-replies">{renderComments(replies)}</div>
        )}
      </React.Fragment>
    ));

  return (
    <div className="App">
      <div
        className={`content ${
          Object.keys(comments).length > 0 ? "has-comments" : ""
        }`}
      >
        <h1>
          <Comment
            id="1"
            onSaveComment={handleSaveComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            showComment={showComment}
            handleShowComment={handleShowComment}
          >
            lorem ipsum
          </Comment>
        </h1>
        <p>
          <Comment
            id="2"
            onSaveComment={handleSaveComment}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            showComment={showComment}
            handleShowComment={handleShowComment}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            vitae semper leo. Sed risus arcu, imperdiet eget scelerisque vitae,
            iaculis vitae arcu. In enim nibh, volutpat ac dictum vel, luctus id
            quam.
          </Comment>
        </p>
      </div>
      {Object.keys(comments).length > 0 && (
        <div className="sidebar">
          <h3>Comments</h3>
          {renderComments(comments)}
        </div>
      )}
    </div>
  );
}

export default App;
