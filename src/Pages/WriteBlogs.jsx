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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-lg p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-8 text-center">
          Create Your Story
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="group">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={blogData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 p-3"
              placeholder="Enter your blog title"
              required
            />
          </div>

          <div className="group">
            <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Author Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={blogData.author}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 p-3"
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="group">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Blog Content
            </label>
            <textarea
              id="content"
              name="content"
              value={blogData.content}
              onChange={handleChange}
              rows={8}
              className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 p-3"
              placeholder="Write your story here..."
              required
            />
          </div>

          <div className="group">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={blogData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 p-3"
              placeholder="Enter image URL"
            />
          </div>

          <div className="group">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={blogData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 p-3 appearance-none bg-white"
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

          <div className="group">
            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-purple-600">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={blogData.tags}
              onChange={handleChange}
              className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all duration-200 p-3"
              placeholder="Enter tags (comma-separated)"
            />
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-base font-medium text-white shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </>
              ) : (
                'Publish Story'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default WriteBlogs