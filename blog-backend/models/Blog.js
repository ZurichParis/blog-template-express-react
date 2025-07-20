import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  youtubeLink: {
    type: String,
    trim: true
  },
  level: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  relatedBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  published: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

// Index for efficient querying
blogSchema.index({ theme: 1, updatedAt: -1 })
blogSchema.index({ published: 1, updatedAt: -1 })

export default mongoose.model('Blog', blogSchema)