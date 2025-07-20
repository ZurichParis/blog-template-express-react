
import { useState } from 'react';

const RelatedBlogsSelector = ({
  blogs,
  selectedBlogs = [], 
  onSelectionChange,
  currentBlogId = null // Exclude current blog from selection
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Filter blogs based on search term
  const filteredBlogs = blogs?.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Toggle blog selection
  const toggleBlogSelection = (blogId) => {
    const isSelected = selectedBlogs.includes(blogId);
    let newSelection;
    
    if (isSelected) {
      newSelection = selectedBlogs.filter(id => id !== blogId);
    } else {
      newSelection = [...selectedBlogs, blogId];
    }
    
    onSelectionChange(newSelection);
  };

  // Get selected blog titles for display
  const getSelectedBlogTitles = () => {
    return blogs
      ?.filter(blog => selectedBlogs.includes(blog._id))
      .map(blog => blog.title) || [];
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Related Blogs
        <span className="text-gray-500 text-xs ml-2">
          ({selectedBlogs.length} selected)
        </span>
      </label>
      
      {/* Selected blogs display */}
      {selectedBlogs.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {getSelectedBlogTitles().map((title, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {title}
                <button
                  type="button"
                  onClick={() => toggleBlogSelection(selectedBlogs[index])}
                  className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Dropdown toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <span className="float-right">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="border border-gray-300 rounded-md bg-white shadow-lg max-h-60 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Blog list */}
          <div className="max-h-40 overflow-y-auto">
            {filteredBlogs.length === 0 ? (
              <div className="p-3 text-gray-500 text-sm">
                {searchTerm ? 'No blogs found' : 'No blogs available'}
              </div>
            ) : (
              filteredBlogs.filter(blog => blog._id !== currentBlogId).map((blog) => (
                <label
                  key={blog._id}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <input
                    type="checkbox"
                    checked={selectedBlogs.includes(blog._id)}
                    onChange={() => toggleBlogSelection(blog._id)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {blog.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedBlogsSelector
