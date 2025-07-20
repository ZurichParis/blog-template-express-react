import express from 'express'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
import Blog from '../models/Blog.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// POST /api/admin/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' })
    }
    
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    const isValidPassword = await admin.comparePassword(password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }
    
    const token = jwt.sign(
      { adminId: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )
    
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// GET /api/admin/blogs - Get all blogs (including unpublished)
router.get('/blogs', authenticateToken, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ updatedAt: -1 })
      .select('-__v')
    
    res.json(blogs)
  } catch (error) {
    console.error('Error fetching admin blogs:', error)
    res.status(500).json({ error: 'Failed to fetch blogs' })
  }
})

// POST /api/admin/blogs - Create new blog
router.post('/blogs', authenticateToken, async (req, res) => {
  try {
    const { title, content, theme, youtubeLink, level, description, duration, relatedBlogs, published } = req.body
    
    if (!title || !content || !theme || !youtubeLink || !level || !description || !duration ) {
      return res.status(400).json({ error: 'Title, content, theme, youtubeLink, level, description, duration are required' })
    }
    
    const blog = new Blog({
      title,
      content,
      theme: theme.toLowerCase(),
      youtubeLink,
      level,
      description,
      duration,
      relatedBlogs: relatedBlogs || [],
      published: published !== undefined ? published : true
    })
    
    await blog.save()
    
    // Emit WebSocket event for real-time updates
    const io = req.app.get('io')
    if (blog.published) {
      io.emit('blogCreated', blog)
    }
    
    res.status(201).json(blog)
  } catch (error) {
    console.error('Error creating blog:', error)
    res.status(500).json({ error: 'Failed to create blog' })
  }
})

// PUT /api/admin/blogs/:id - Update blog
router.put('/blogs/:id', authenticateToken, async (req, res) => {
  try {
    const { title, content, theme, youtubeLink, level, description, duration, relatedBlogs, published } = req.body
    
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    
    const wasPublished = blog.published
    
    blog.title = title || blog.title
    blog.content = content || blog.content
    blog.theme = theme ? theme.toLowerCase() : blog.theme
    blog.youtubeLink = youtubeLink !== undefined ? youtubeLink : blog.youtubeLink
    blog.level = level || blog.level
    blog.description = description || blog.description
    blog.duration = duration || blog.duration
    blog.relatedBlogs = relatedBlogs || blog.relatedBlogs
    blog.published = published !== undefined ? published : blog.published
    
    await blog.save()
    
    // Emit WebSocket event for real-time updates
    const io = req.app.get('io')
    if (blog.published) {
      if (wasPublished) {
        io.emit('blogUpdated', blog)
      } else {
        // Blog was just published
        io.emit('blogCreated', blog)
      }
    } else if (wasPublished) {
      // Blog was unpublished
      io.emit('blogDeleted', { _id: blog._id }) // just unpublished, not deleting
    }
    
    res.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({ error: 'Failed to update blog' })
  }
})

// DELETE /api/admin/blogs/:id - Delete blog
router.delete('/blogs/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    
    const wasPublished = blog.published
    
    await Blog.findByIdAndDelete(req.params.id)
    
    // Emit WebSocket event for real-time updates
    const io = req.app.get('io')
    if (wasPublished) {
      io.emit('blogDeleted', { _id: req.params.id })
    }
    
    res.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({ error: 'Failed to delete blog' })
  }
})

export default router