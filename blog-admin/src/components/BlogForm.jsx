import { useState, useEffect } from 'react'
import RelatedBlogsSelector from './RelatedBlogsSelector'

function BlogForm({ blogs, blog, onSave, onCancel, isEditing }) {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    theme: '',
    youtubeLink: '',
    level: '',
    description: '',
    duration: '',
    relatedBlogs: [],
    published: true
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // if blog is not null, then populate form data
    if (blog) {
      setFormData({
        title: blog.title || '',
        content: blog.content || '',
        theme: blog.theme || '',
        youtubeLink: blog.youtubeLink || '',
        level: blog.level || '',
        description: blog.description || '',
        duration: blog.duration || '',
        relatedBlogs: blog.relatedBlogs || [],
        published: blog.published !== undefined ? blog.published : true
      })
    }
  }, [blog])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.theme.trim() || !formData.level.trim() || !formData.description.trim() || !formData.duration.trim()) {
      alert('Please fill in all required fields (Title, Content, Theme, Level, Description, Duration)')
      return
    }

    setLoading(true)
    try {
      await onSave(formData)
    } finally {
      setLoading(false) // no point, because the page will be redirect to list view after save
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="bg-[#f8f9fa] shadow rounded-lg pb-40">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-blue-700">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter blog post title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-blue-700">
                  Theme *
                </label>
                <input
                  type="text"
                  name="theme"
                  id="theme"
                  required
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., React, JavaScript, CSS"
                  value={formData.theme}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="youtubeLink" className="block text-sm font-medium text-blue-700">
                  YouTube Link
                </label>
                <input
                  type="url"
                  name="youtubeLink"
                  id="youtubeLink"
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://youtube.com/watch?v=..."
                  value={formData.youtubeLink}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="level" className="block text-sm font-medium text-blue-700">
                  Level *
                </label>
                <input
                  type="text"
                  name="level"
                  id="level"
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  value={formData.level}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-blue-700">
                  Description *
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  required
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter blog post description for banner"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-blue-700">
                  Duration *
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  required
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., 1 hour, 2 hours, 3 hours"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="content" className="block text-sm font-medium text-blue-700">
                  Content *
                </label>
                <textarea
                  name="content"
                  id="content"
                  rows={12}
                  required
                  className="px-2 py-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Write your blog post content here..."
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>
              <div>
                <RelatedBlogsSelector
                  blogs={blogs}
                  selectedBlogs={formData.relatedBlogs}
                  onSelectionChange={(selected) => setFormData({ ...formData, relatedBlogs: selected })}
                  currentBlogId={blog?._id}
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center">
                  <input
                    id="published"
                    name="published"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.published}
                    onChange={handleChange}
                  />
                  <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                    Publish immediately
                  </label>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Uncheck to save as draft
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : null}
                {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BlogForm