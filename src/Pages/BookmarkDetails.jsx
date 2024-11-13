import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const BookmarkDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getBlogs } = useFirebase();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogs = await getBlogs("blogs");
                const foundBlog = blogs.find(blog => blog.id === id);
                setBlog(foundBlog);
            } catch (error) {
                console.error("Error fetching blog details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
    }, [id, getBlogs]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold text-gray-800">Blog not found</h2>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {blog.image && (
                    <div className="h-96 overflow-hidden">
                        <img 
                            src={blog.image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl font-bold">{blog.author[0]}</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">{blog.author}</h3>
                                <p className="text-sm text-gray-500">{blog.date} • {blog.time}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500">
                            <span><i className="fas fa-eye"></i> {blog.views}</span>
                            <span><i className="fas fa-heart text-red-500"></i> {blog.likes}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6 text-justify">{blog.content}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {blog.category && (
                            <span className="px-4 py-1 bg-blue-100 text-blue-600 rounded-full">
                                {blog.category}
                            </span>
                        )}
                        {blog.tags && blog.tags.split(',').map((tag, i) => (
                            <span key={i} className="px-4 py-1 bg-gray-100 text-gray-600 rounded-full">
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkDetails; 