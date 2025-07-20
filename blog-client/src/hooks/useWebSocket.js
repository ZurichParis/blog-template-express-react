import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'

const useWebSocket = (url, onMessage) => {
  const socketRef = useRef(null)

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = io(url)

    // Set up event listeners
    const socket = socketRef.current

    socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    socket.on('blogCreated', (blog) => {
      console.log('New blog created:', blog.title)
      onMessage?.('blogCreated', blog)
    })

    socket.on('blogUpdated', (blog) => {
      console.log('Blog updated:', blog.title)
      onMessage?.('blogUpdated', blog)
    })

    socket.on('blogDeleted', (data) => {
      console.log('Blog deleted:', data._id)
      onMessage?.('blogDeleted', data)
    })

    // Cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [url, onMessage])

  return socketRef.current
}

export default useWebSocket