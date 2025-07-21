import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { Server } from 'socket.io'
import blogRoutes from './routes/blogs.js'
import adminRoutes from './routes/admin.js'

dotenv.config()
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"]
  }
})
console.log("allowed Origins", allowedOrigins)

const PORT = process.env.PORT || 5050

// Middleware
app.use(cors())
app.use(express.json())

// Make io available to routes
app.set('io', io)

// Routes
app.use('/api/blogs', blogRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb')
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id)
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

// Start server
const startServer = async () => {
  await connectDB()
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`WebSocket server ready`)
  })
}

startServer()
