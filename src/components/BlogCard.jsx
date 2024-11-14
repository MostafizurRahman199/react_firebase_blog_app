import React from 'react';
import CommentList from './CommentList';
import CommentInput from './CommentInput';

const BlogCard = ({
    blog,
    isHighlighted,
    iconStyle,
    handleLike,
    handleBookmark,
    handleComment,
    toggleComments,
    openComments,
    commentText,
    setCommentText,
    isSubmittingComment,
    onCommentDelete
}) => {
    const { icon, color } = iconStyle;

    return (
        <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col
            ${isHighlighted ? 'ring-2 ring-blue-500 transform scale-[1.02]' : ''}`}>
            {/* Blog Image */}
            {blog.image && (
                <div className="h-64 overflow-hidden">
                    <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Blog Content */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Author Header */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shadow-lg`}>
                            <i className={`fas ${icon} text-md text-white`}></i>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">{blog.author}</p>
                            <p className="text-xs text-gray-500">{blog.date} • {blog.time}</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-500 text-sm">
                        <span><i className="fas fa-eye"></i> {blog.views}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(blog.id);
                            }}
                            className="hover:text-blue-500 transition-colors duration-100"
                        >
                            <i className={`fas fa-bookmark ${blog.isBookmarked ? 'text-blue-500 animate-scale-bounce' : ''}`}></i>
                        </button>
                        <span><i className="fas fa-heart text-red-500"></i> {blog.likes}</span>
                    </div>
                </div>

                {/* Title and Content */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                    {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 text-justify">{blog.content}</p>

                {/* Categories and Interactions */}
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.category && (
                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                                {blog.category}
                            </span>
                        )}
                        {blog.tags && blog.tags.split(',').map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                        <button 
                            className="text-gray-600 hover:text-red-500 transition-colors duration-100 flex items-center space-x-2 "
                            onClick={() => handleLike(blog.id)}
                        >
                            <i className={`fas fa-heart 
                                ${blog.isLiked ? 'text-red-500 animate-scale-bounce' : ''} 
                                transform transition-all duration-300 
                                hover:scale-110 
                                text-lg`}
                            ></i>
                            <span>{blog.likes}</span>
                        </button>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <span className="flex items-center space-x-1">
                                <i className="fas fa-comment text-lg"></i>
                                <span>{blog.comments?.length || 0}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-4 border-t pt-4">
                <div 
                    onClick={() => toggleComments(blog.id)}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors duration-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800">Comments ({blog.comments?.length || 0})</h3>
                    <i className={`fas fa-chevron-${openComments === blog.id ? 'up' : 'down'} text-gray-500 transition-transform duration-200`}></i>
                </div>
                
                {openComments === blog.id && (
                    <>
                        <CommentList 
                            comments={blog.comments} 
                            blogId={blog.id}
                            onCommentDelete={onCommentDelete}
                        />
                        <CommentInput 
                            commentText={commentText}
                            setCommentText={setCommentText}
                            handleComment={handleComment}
                            blogId={blog.id}
                            isSubmitting={isSubmittingComment}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogCard; 