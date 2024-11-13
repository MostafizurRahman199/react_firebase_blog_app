import React from 'react';

const PostCard = ({ title, content, author, date }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{title}</h2>
        <div className="post-meta">
          <span className="post-author">{author}</span>
          <span className="post-date">{date}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostCard;
