import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Admin API functions
export const adminAPI = {
  // Admin login
  login: async (username, password) => {
    try {
      const response = await api.post('/admin/login', { username, password })
      return response.data
    } catch (error) {
      console.error('Error logging in:', error)
      throw error
    }
  },

  // Get all blogs (admin view)
  getBlogs: async (token) => {
    try {
      const response = await api.get('/admin/blogs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching admin blogs:', error)
      throw error
    }
  },

  // Create new blog
  createBlog: async (blogData, token) => {
    try {
      const response = await api.post('/admin/blogs', blogData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error('Error creating blog:', error)
      throw error
    }
  },

  // Update blog
  updateBlog: async (id, blogData, token) => {
    try {
      const response = await api.put(`/admin/blogs/${id}`, blogData, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error('Error updating blog:', error)
      throw error
    }
  },

  // Delete blog
  deleteBlog: async (id, token) => {
    try {
      const response = await api.delete(`/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (error) {
      console.error('Error deleting blog:', error)
      throw error
    }
  }
}

export default api