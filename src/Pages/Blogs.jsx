import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';

const Blogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {getBlogs, updateLike, user, addComment} = useFirebase();
    const [blogs, setBlogs] = useState([]); 
    const [commentText, setCommentText] = useState('');
    const [openComments, setOpenComments] = useState(null);

    // Array of modern icon styles and colors
    const iconStyles = [
        { icon: "fa-user-astronaut", color: "bg-purple-500" },
        { icon: "fa-user-ninja", color: "bg-blue-500" },
        { icon: "fa-user-secret", color: "bg-green-500" },
        { icon: "fa-user-tie", color: "bg-yellow-500" },
        { icon: "fa-user-graduate", color: "bg-pink-500" },
        { icon: "fa-user-doctor", color: "bg-red-500" },
    ];

    const getRandomIconStyle = (index) => {
        return iconStyles[index % iconStyles.length];
    };

    useEffect(()=>{
        getBlogs("blogs")
        .then(blogs => {
            // Add isLiked property to each blog based on current user
            const blogsWithLikeStatus = blogs.map(blog => ({
                ...blog,
                isLiked: user && blog.likedBy ? blog.likedBy.includes(user.uid) : false
            }));
            setBlogs(blogsWithLikeStatus);
        })
        .catch(err=>console.log(err))
        .finally(()=>setIsLoading(false));
    }, [user]); // Add user as dependency

    

    const handleLike = async (blogId) => {
        try {
            // Check if user is logged in
            if (!user) {
                alert("Please login to like posts");
                return;
            }

            // Find the blog first
            const blogToUpdate = blogs.find(blog => blog.id === blogId);
            if (!blogToUpdate) return;

            // Check if user has already liked this blog
            if (blogToUpdate.likedBy && blogToUpdate.likedBy.includes(user.uid)) {
                // User already liked, so unlike
                const newLikes = Number(blogToUpdate.likes) - 1;
                const newLikedBy = blogToUpdate.likedBy.filter(id => id !== user.uid);
                
                // Update Firebase
                await updateLike("blogs", blogId, newLikes, newLikedBy);
                
                // Update local state
                setBlogs(blogs.map(blog => {
                    if (blog.id === blogId) {
                        return {
                            ...blog,
                            likes: newLikes,
                            likedBy: newLikedBy,
                            isLiked: false
                        };
                    }
                    return blog;
                }));
            } else {
                // User hasn't liked, so add like
                const newLikes = Number(blogToUpdate.likes) + 1;
                const newLikedBy = [...(blogToUpdate.likedBy || []), user.uid];
                
                // Update Firebase
                await updateLike("blogs", blogId, newLikes, newLikedBy);
                
                // Update local state
                setBlogs(blogs.map(blog => {
                    if (blog.id === blogId) {
                        return {
                            ...blog,
                            likes: newLikes,
                            likedBy: newLikedBy,
                            isLiked: true
                        };
                    }
                    return blog;
                }));
            }
        } catch (error) {
            console.error("Error updating like:", error);
        }
    };

    const handleComment = async (blogId) => {
        try {
            if (!user) {
                alert("Please login to comment");
                return;
            }
            if (!commentText.trim()) {
                alert("Please enter a comment");
                return;
            }

            const newComment = {
                text: commentText,
                authorId: user.uid,
                authorName: user.displayName || 'Anonymous',
                createdAt: new Date().toISOString(),
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString()
            };

            // Update Firebase
            await addComment("blogs", blogId, newComment);

            // Update local state - ensure comments is always an array
            setBlogs(blogs.map(blog => {
                if (blog.id === blogId) {
                    const currentComments = Array.isArray(blog.comments) ? blog.comments : [];
                    return {
                        ...blog,
                        comments: [...currentComments, newComment],
                        commentCount: (blog.commentCount || 0) + 1
                    };
                }
                return blog;
            }));

            // Clear comment input
            setCommentText('');
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const toggleComments = (blogId) => {
        setOpenComments(openComments === blogId ? null : blogId);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Featured Articles</h1>
            
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
                    {blogs.map((blog, index) => {
                        const { icon, color } = getRandomIconStyle(index);
                        return (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                                {blog.image && (
                                    <div className="h-64 overflow-hidden">
                                        <img 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                )}
                                <div className="p-6 flex-1 flex flex-col">
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
                                        <div className="flex items-center space-x-2 text-gray-500 text-sm">
                                            <span><i className="fas fa-eye"></i> {blog.views}</span>
                                            <span><i className="fas fa-heart text-red-500"></i> {blog.likes}</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                                        {blog.title}
                                    </h2>
                                    
                                    <p className="text-gray-600 mb-4 text-justify">{blog.content}</p>
                                    
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
                                                className="text-gray-600 hover:text-red-500 transition-colors duration-300 flex items-center space-x-2"
                                                onClick={() => handleLike(blog.id)}
                                            >
                                                <i className={`fas fa-heart ${blog.isLiked ? 'text-red-500 scale-110' : ''} transform transition-all duration-200 hover:scale-150 text-lg`}></i>
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
                                            {/* Comment List */}
                                            <div className="space-y-4 mb-6 mt-3 px-3">
                                                {Array.isArray(blog.comments) && blog.comments.map((comment, i) => (
                                                    <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
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

                                            {/* Comment Input */}
                                            <div className="px-3 mb-4">
                                                <div className="flex gap-3 bg-gray-50 p-4 rounded-lg shadow-sm">
                                                    <input
                                                        type="text"
                                                        value={commentText}
                                                        onChange={(e) => setCommentText(e.target.value)}
                                                        placeholder="Write a comment..."
                                                        className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                                    />
                                                    <button
                                                        onClick={() => handleComment(blog.id)}
                                                        className="bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 font-medium"
                                                    >
                                                        <i className="fas fa-paper-plane text-lg"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Blogs