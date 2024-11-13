import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getBlogs } = useFirebase();

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const blogs = await getBlogs("blogs");
        // Sort blogs by date (assuming there's a timestamp or date field)
        const sortedBlogs = blogs.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        // Get only the latest 3 posts
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
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={post.image || "https://source.unsplash.com/800x600/?blog"} 
              alt={post.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <span className="text-sm text-blue-600 font-semibold">{post.category}</span>
              <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.content?.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">
                    <i className="fas fa-heart"></i> {post.likes || 0}
                  </span>
                  <span className="text-gray-500">
                    <i className="fas fa-comment"></i> {post.comments?.length || 0}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">{post.date}</span>
                <button 
                  onClick={() => navigate(`/blogs?postId=${post.id}`)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  See Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery; 