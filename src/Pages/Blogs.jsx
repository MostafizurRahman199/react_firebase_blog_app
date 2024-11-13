import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';
import BlogCard from '../components/BlogCard';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const Blogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {getBlogs, updateLike, user, addComment, updateBookmark, deleteComment} = useFirebase();
    const [blogs, setBlogs] = useState([]); 
    const [commentText, setCommentText] = useState('');
    const [openComments, setOpenComments] = useState(null);
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [searchParams] = useSearchParams();
    const highlightedPostId = searchParams.get('postId');

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

    useEffect(() => {
        const postId = searchParams.get('postId');
        
        getBlogs("blogs")
        .then(blogs => {
            const blogsWithStatus = blogs.map(blog => ({
                ...blog,
                isLiked: user && blog.likedBy ? blog.likedBy.includes(user.uid) : false,
                isBookmarked: user && blog.bookmarkedBy ? blog.bookmarkedBy.includes(user.uid) : false
            }));
            
            // If postId is present, filter to show only that post
            if (postId) {
                const filteredBlogs = blogsWithStatus.filter(blog => blog.id === postId);
                setBlogs(filteredBlogs);
            } else {
                setBlogs(blogsWithStatus);
            }
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }, [user, searchParams]); // Add searchParams as dependency

    

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
                toast.error("Please login to comment");
                return;
            }
            if (!commentText.trim()) {
               toast.warning("Please write comment then submit");
                return;
            }

            setIsSubmittingComment(true);

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

            setCommentText('');
        } catch (error) {
            console.error("Error adding comment:", error);
        } finally {
            setIsSubmittingComment(false);
        }
    };

    const toggleComments = (blogId) => {
        setOpenComments(openComments === blogId ? null : blogId);
    };

    const handleBookmark = async (blogId) => {
        try {
            if (!user) {
                toast.error("Please login to bookmark posts");
                return;
            }

            const blogToUpdate = blogs.find(blog => blog.id === blogId);
            if (!blogToUpdate) return;

            if (blogToUpdate.bookmarkedBy && blogToUpdate.bookmarkedBy.includes(user.uid)) {
                // Remove bookmark
                const newBookmarkedBy = blogToUpdate.bookmarkedBy.filter(id => id !== user.uid);
                
                // Update Firebase
                await updateBookmark("blogs", blogId, newBookmarkedBy);
                
                // Update local state
                setBlogs(blogs.map(blog => {
                    if (blog.id === blogId) {
                        return {
                            ...blog,
                            bookmarkedBy: newBookmarkedBy,
                            isBookmarked: false
                        };
                    }
                    return blog;
                }));
            } else {
                // Add bookmark
                const newBookmarkedBy = [...(blogToUpdate.bookmarkedBy || []), user.uid];
                
                // Update Firebase
                await updateBookmark("blogs", blogId, newBookmarkedBy);
                
                // Update local state
                setBlogs(blogs.map(blog => {
                    if (blog.id === blogId) {
                        return {
                            ...blog,
                            bookmarkedBy: newBookmarkedBy,
                            isBookmarked: true
                        };
                    }
                    return blog;
                }));
            }
        } catch (error) {
            console.error("Error updating bookmark:", error);
        }
    };

    const handleCommentDelete = async (blogId, commentIndex) => {
        try {
            // Update local state first for immediate UI update
            setBlogs(prevBlogs => prevBlogs.map(blog => {
                if (blog.id === blogId) {
                    const updatedComments = [...(blog.comments || [])];
                    updatedComments.splice(commentIndex, 1);
                    return {
                        ...blog,
                        comments: updatedComments,
                        commentCount: Math.max((blog.commentCount || 0) - 1, 0)
                    };
                }
                return blog;
            }));

            // Then update Firebase
            await deleteComment("blogs", blogId, commentIndex);
        } catch (error) {
            console.error("Error deleting comment:", error);
            // Optionally revert the state if the Firebase update fails
            toast.error("Failed to delete comment");
        }
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
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={blog.id}
                            blog={blog}
                            isHighlighted={blog.id === highlightedPostId}
                            iconStyle={getRandomIconStyle(index)}
                            handleLike={handleLike}
                            handleBookmark={handleBookmark}
                            handleComment={handleComment}
                            toggleComments={toggleComments}
                            openComments={openComments}
                            commentText={commentText}
                            setCommentText={setCommentText}
                            isSubmittingComment={isSubmittingComment}
                            onCommentDelete={handleCommentDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Blogs