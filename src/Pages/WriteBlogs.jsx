import React, { useState } from 'react'
import { useFirebase } from '../context/Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// ___________________________Component start

const WriteBlogs = () => {

// ___________________________useFirebase

  const {writeData} = useFirebase();
  const [isLoading, setIsLoading] = useState(false);



// ___________________________Blog Data

  const [blogData, setBlogData] = useState({
    title: '',
    author: '',
    content: '',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    image: '',
    category: '',
    tags: '',
    views: 0,
    likes: 0,
    likedBy: [],
    comments: [],
    commentCount: 0,
    isLiked: false,
    isBookmarked: false,
  })




// ___________________________Handle Change

  const handleChange = (e) => {
    
    const { name, value } = e.target

    setBlogData(prev => ({
      ...prev,
      [name]: value
    }))
    
  }




// ___________________________Handle Submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await writeData("blogs", blogData);
      setBlogData({
        title: '',
        author: '',
        content: '',
        image: '',
        category: '',
        tags: '',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        views: 0,
        likes: 0,
        likedBy: [],
        comments: [],
        commentCount: 0,
        isBookmarked: false,
      });
      toast.success('Blog posted successfully!', {position: 'top-center'});
    } catch (error) {
      console.error('Error posting blog:', error);
      toast.error('Failed to post blog. Please try again.', {position: 'top-left'});
      toast.error('Failed to post blog. Please try again.', {position: 'top-right'});
    } finally {
      setIsLoading(false);
    }
  }




// ___________________________Component return

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 shadow-md rounded-md my-8 bg-gradient-to-r from-indigo-100 to-purple-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Blog</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter your blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author Name
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={blogData.author}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter author name"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            value={blogData.content}
            onChange={handleChange}
            rows={8}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Write your blog content here..."
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={blogData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={blogData.category}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            required
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fashion">Fashion</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={blogData.tags}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            placeholder="Enter tags (comma-separated)"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : (
              'Post Blog'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default WriteBlogs