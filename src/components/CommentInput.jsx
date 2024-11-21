import React from 'react';
import { useFirebase } from '../context/Firebase';

const CommentInput = ({ commentText, setCommentText, handleComment, blogId, isSubmitting }) => {

const {user} = useFirebase();


    return (
        <>
            {user ? (
                <div className="px-3 mb-4">
                    <div className="flex gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Write a comment..."
                            className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            disabled={isSubmitting}
                        />
                        <button
                            onClick={() => handleComment(blogId)}
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <i className="fas fa-spinner fa-spin text-lg"></i>
                            ) : (
                                <i className="fas fa-paper-plane text-lg"></i>
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className='px-3 mb-4 text-center text-gray-500 text-sm font-medium '>Login to comment ‼️</div>
            )}
        </>
    );
};

export default CommentInput; 