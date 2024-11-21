import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Gallery = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getBlogs } = useFirebase();

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const blogs = await getBlogs("blogs");
        const sortedBlogs = blogs.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setPosts(sortedBlogs.slice(0, 3));
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, [getBlogs]);

  if (loading) {
    return (
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="latest-posts" className="py-12 px-4 w-10/12 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl shadow-xl   hover:shadow-2xl "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            

          >
            <img 
              src={post.image || "https://source.unsplash.com/800x600/?blog"} 
              alt={post.title} 
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="p-6">
              <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-black mb-4">{post.content?.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-white">{post.date}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-white">
                    ♥️ {post.likes || 0}
                  </span>
                  <span className="text-white">
                    <i className="fas fa-comment"></i> {post.comments?.length || 0}
                  </span>
                </div>
              </div>
              <div className="flex flex-grow justify-end items-end mt-4">
                <button 
                  onClick={() => navigate(`/blogs?postId=${post.id}`)}
                  className="text-blue-500 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  See Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Gallery; 