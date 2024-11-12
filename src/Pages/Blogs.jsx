import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase';

const Blogs = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {getBlogs} = useFirebase();
    const [blogs, setBlogs] = useState([]);

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
        getBlogs("blogs").
        then(blogs=>setBlogs(blogs))
        .catch(err=>console.log(err))
        .finally(()=>setIsLoading(false));
    },[])


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Our Blog Posts</h1>
            
            {isLoading ? (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <div className="flex flex-col space-y-6 max-w-2xl mx-auto">
                    {blogs.map((blog, index) => {
                        const { icon, color } = getRandomIconStyle(index);
                        return (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <div className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200`}>
                                            <i className={`fas ${icon} text-md text-white`}></i>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">By {blog.author}</p>
                                            <p className="text-xs text-gray-500">{blog.date}</p>
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
                                    <p className="text-gray-700 mb-4">{blog.content}</p>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                                        Read More
                                    </button>
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