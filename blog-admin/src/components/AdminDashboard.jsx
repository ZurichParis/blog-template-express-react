import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import { adminAPI } from '../services/api'
import BlogList from './BlogList'
import BlogForm from './BlogForm'
import Header from './Header'
import Pagination from './Pagination'

function AdminDashboard() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('list') // 'list', 'create', 'edit'
  const [editingBlog, setEditingBlog] = useState(null)
  const [paginatedBlogs, setPaginatedBlogs] = useState([])
  const { token } = useAuth()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const blogsData = await adminAPI.getBlogs(token)
      setBlogs(blogsData)
    } catch (error) {
      toast.error('Failed to fetch blogs')
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBlog = () => {
    setEditingBlog(null)
    setCurrentView('create')
  }

  const handleEditBlog = (blog) => {
    setEditingBlog(blog)
    setCurrentView('edit')
  }

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    try {
      await adminAPI.deleteBlog(blogId, token)
      setBlogs(blogs.filter(blog => blog._id !== blogId))
      toast.success('Blog post deleted successfully')
    } catch (error) {
      toast.error('Failed to delete blog post')
      console.error('Error deleting blog:', error)
    }
  }

  const handleSaveBlog = async (blogData) => {
    try {
      if (editingBlog) {
        // Update existing blog
        const updatedBlog = await adminAPI.updateBlog(editingBlog._id, blogData, token)
        setBlogs(blogs.map(blog => blog._id === editingBlog._id ? updatedBlog : blog))
        toast.success('Blog post updated successfully')
      } else {
        // Create new blog
        const newBlog = await adminAPI.createBlog(blogData, token)
        setBlogs([newBlog, ...blogs])
        toast.success('Blog post created successfully')
      }
      setCurrentView('list')
      setEditingBlog(null)
    } catch (error) {
      toast.error(editingBlog ? 'Failed to update blog post' : 'Failed to create blog post')
      console.error('Error saving blog:', error)
    }
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setEditingBlog(null)
  }

  const handlePageChange = (currentItems) => {
    setPaginatedBlogs(currentItems)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {currentView === 'list' && (
            <div>
              <BlogList
                blogs={paginatedBlogs}
                onCreateBlog={handleCreateBlog}
                onEditBlog={handleEditBlog}
                onDeleteBlog={handleDeleteBlog}
              />
              <Pagination
                items={blogs}
                itemsPerPage={9}
                onPageChange={handlePageChange}
              />
            </div>
          )}
          
          {(currentView === 'create' || currentView === 'edit') && (
            <BlogForm
              blogs={blogs}
              blog={editingBlog}
              onSave={handleSaveBlog}
              onCancel={handleBackToList}
              isEditing={currentView === 'edit'}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard