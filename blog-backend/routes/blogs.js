import express from 'express'
import Blog from '../models/Blog.js'

const router = express.Router()

// GET /api/blogs - Get all published blogs
router.get('/', async (req, res) => {
  try {
    const { theme } = req.query
    
    let query = { published: true }
    if (theme && theme !== 'all') {
      query.theme = theme.toLowerCase()
    }
    
    const blogs = await Blog.find(query)
      .sort({ updatedAt: -1 })
      .select('-__v')
    
    res.json(blogs)
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({ error: 'Failed to fetch blogs' })
  }
})

// GET /api/blogs/:id - Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).select('-__v')
    
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    
    if (!blog.published) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    
    res.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    res.status(500).json({ error: 'Failed to fetch blog' })
  }
})

// GET /api/blogs/themes/list - Get all available themes
router.get('/themes/list', async (req, res) => {
  try {
    const themes = await Blog.distinct('theme', { published: true })
    res.json(themes.sort())
  } catch (error) {
    console.error('Error fetching themes:', error)
    res.status(500).json({ error: 'Failed to fetch themes' })
  }
})

export default router