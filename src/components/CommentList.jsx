import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';

const CommentList = ({ comments, blogId, onCommentDelete }) => {
  const { user } = useFirebase();
  const [deletingCommentIndex, setDeletingCommentIndex] = useState(null);

  const handleDeleteComment = async (index) => {
    try {
      setDeletingCommentIndex(index);
      await onCommentDelete(blogId, index);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeletingCommentIndex(null);
    }
  };

  return (
    <div className="space-y-4 mb-6 mt-3 px-3">
      {Array.isArray(comments) && comments.map((comment, i) => (
        <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 relative">
          {user && user.uid === comment.authorId && (
            <button
              onClick={() => handleDeleteComment(i)}
              className="absolute -top-2 -right-2 w-6 h-6  bg-slate-200 rounded-full flex items-center justify-center shadow-sm hover:shadow-lg  hover:scale-105 transition-all duration-200"
              title="Delete comment"
              disabled={deletingCommentIndex === i}
            >
              {deletingCommentIndex === i ? (
                <i className="fas fa-spinner fa-spin text-red-500 text-sm"></i>
              ) : (
                <span className="text-red-500 hover:text-red-700 text-sm ">❌</span>
              )}
            </button>
          )}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">{comment.authorName[0]}</span>
              </div>
              <span className="font-medium text-gray-800">{comment.authorName}</span>
            </div>
            <span className="text-sm text-gray-500">
              {comment.date} • {comment.time}
            </span>
          </div>
          <p className="text-gray-700 ml-10">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList; 