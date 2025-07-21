import { useState, useEffect, useCallback, useRef} from 'react'
import BlogThumbnail from './BlogThumbnail'
import BlogDetail from './BlogDetail'
import ThemeFilter from './ThemeFilter'
import UpdateNotification from './UpdateNotification'
import useWebSocket from '../hooks/useWebSocket'
import Pagination from './Pagination'

function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const [selectedTheme, setSelectedTheme] = useState('all')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)
  const [paginatedBlogs, setPaginatedBlogs] = useState([])

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBlog, paginatedBlogs])

  const fetchBlogs = async () => {
    try {
      console.log("fetch blogs be called")
      setLoading(true)
      const { blogAPI } = await import('../services/api.js')
      const blogsData = await blogAPI.getBlogs()
      setBlogs(blogsData)
      setFilteredBlogs(blogsData)
    } catch (error) {
      console.error('Failed to fetch blogs:', error)
      // Fallback to empty array if API fails
      setBlogs([])
      setFilteredBlogs([])
    } finally {
      setLoading(false)
    }
  }

  // WebSocket message handler
  const handleWebSocketMessage = useCallback((event, data) => {
    switch (event) {
      case 'blogCreated':
        setBlogs(prevBlogs => {
          const newBlogs = [data, ...prevBlogs]
          return newBlogs.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        })
        setNotification({
          message: `New blog post: "${data.title}"`,
          type: 'success'
        })
        break
      
      case 'blogUpdated':
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => 
            blog._id === data._id ? data : blog
          ).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        )
        if (selectedBlog) {
          setSelectedBlog(data)
        }
        setNotification({
          message: `Blog updated: "${data.title}"`,
          type: 'info'
        })
        break
      
      case 'blogDeleted':
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== data._id))
        // If currently viewing the deleted blog, go back to list
        if (selectedBlog && selectedBlog._id === data._id) {
          setSelectedBlog(null)
        }
        setNotification({
          message: 'A blog post has been removed',
          type: 'warning'
        })
        break
      
      default:
        break
    }
  }, [selectedBlog])

  const convertToWebSocketURL = (apiUrl) => {
    // Remove /api suffix if it exists
    const baseUrl = apiUrl.replace(/\/api$/, '');
    
    // Convert HTTP protocols to WebSocket protocols
    if (baseUrl.startsWith('https://')) {
      return baseUrl.replace('https://', 'wss://');
    } else if (baseUrl.startsWith('http://')) {
      return baseUrl.replace('http://', 'ws://');
    }
    
    return baseUrl; // fallback
  };
  
  // Usage:
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050/api';
  const WEBSOCKET_URL = convertToWebSocketURL(API_URL);
  useWebSocket(WEBSOCKET_URL, handleWebSocketMessage);
  console.log('Original API_URL:', API_URL);


  useEffect(() => {
    if (selectedTheme === 'all') {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs(blogs.filter(blog => blog.theme.toLowerCase() === selectedTheme.toLowerCase()))
    }
  }, [selectedTheme, blogs])

  const themes = ['all', ...new Set(blogs.map(blog => blog.theme))]

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog)
  }

  const handleBlogIdClick = (blogId) => {
    setSelectedBlog(blogs.find(blog => blog._id === blogId))
  }

  const handlePageChange = (currentItems) => {
    setPaginatedBlogs(currentItems)
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#f8f9fa]">
      </div>
    )
  }

  if (selectedBlog) {
    // get related blogs
    const relatedBlogs = blogs.filter(blog => selectedBlog.relatedBlogs.includes(blog._id))
    // keep only paired names and ids
    const relatedBlogsNamesIds = relatedBlogs.map(blog => ({ name: blog.title, id: blog._id }))

    return (
      <>
        <BlogDetail blog={selectedBlog} relatedBlogsNamesIds={relatedBlogsNamesIds} handleBlogIdClick={handleBlogIdClick}/>
        {notification && (
          <UpdateNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </>
    )
  }

  // Extract video ID from URL
  function getYouTubeVideoId(url) {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  // Get thumbnail URLs
  function getYouTubeThumbnails(videoId) {
    return {
      default: `https://img.youtube.com/vi/${videoId}/default.jpg`,     // 120x90
      medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,    // 320x180
    };
  }

  const FirstvideoId = getYouTubeVideoId(blogs?.[0]?.youtubeLink);
  const Firstthumbnails = FirstvideoId ? getYouTubeThumbnails(FirstvideoId) : null;

  const FadeInComponent = ({ children, delay = 100, direction = 'down'}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const elementRef = useRef(null);
  
    useEffect(() => {
      // Force the browser to acknowledge the initial state
      if (elementRef.current) {
        // This forces a reflow, ensuring initial styles are applied
        elementRef.current.getBoundingClientRect();
      }
      
      // Small timeout to ensure initial styles are painted
      const renderTimer = setTimeout(() => {
        setShouldRender(true);
      }, 0);
  
      const visibilityTimer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
  
      return () => {
        clearTimeout(renderTimer);
        clearTimeout(visibilityTimer);
      };
    }, [delay]);

    const directionTransform = ()=>{
      switch (direction) {
        case 'up':
          return 'translateY(20px)';
        case 'down':
          return 'translateY(-20px)';
        case 'left':
          return 'translateX(20px)';
        case 'right':
          return 'translateX(-20px)';
        default:
          return 'translateY(0)';

      }
    }
  
    return (
      <div
        ref={elementRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translate(0,0)' : directionTransform(),
          transition: shouldRender ? 'opacity 0.6s ease-out, transform 0.6s ease-out' : 'none',
          // Ensure initial state is always hidden
          visibility: shouldRender ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    );
  };
  

  return (
    <div className="bg-[#f8f9fa] transition-opacity duration-2000">
      {/* Banner */}
      <FadeInComponent delay={100}>
        <div className="mt-20 w-full py-5 bg-[linear-gradient(135deg,_rgb(102,_126,_234)_0%,_rgb(118,_75,_162)_100%)]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex text-[#f8f9fa] items-center">
            {/* Image placeholder */}
            <div className="hidden md:block mr-4 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
              <img 
                src={Firstthumbnails?.medium} 
                alt={blogs?.[0]?.title} 
                className="rounded-lg object-cover" 
              />
            </div>
            <div className="flex max-w-4xl flex-col justify-start ml-5">
              <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-relaxed tracking-wide">
                {blogs?.[0]?.title ?? "No blogs yet"}
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed">
                {blogs?.[0]?.description ?? "No description available"}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                  <button onClick={() => handleBlogClick(blogs?.[0])} className="shadow-[0_20px_40px_rgba(0,0,0,0.3)] bg-red-400 hover:bg-[linear-gradient(45deg,_#ff9500_10%,_#ff6b9d_100%)] px-8 py-4 rounded-full text-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(239,68,68,0.4)] flex items-center gap-1 text-decoration-none">
                      <span>▶</span>
                      播放
                  </button>
                  <span className="hidden md:block bg-white bg-opacity-20 px-4 py-2 rounded-full text-lg">
                      {blogs?.[0]?.duration}
                  </span>
                  <span className="hidden md:block bg-white bg-opacity-20 px-4 py-2 rounded-full text-lg">
                      {blogs?.[0]?.theme}
                  </span>
                  <span className="hidden md:block bg-white bg-opacity-20 px-4 py-2 rounded-full text-lg">
                      {blogs?.[0]?.level}
                  </span>
                  <span className="hidden md:block bg-white bg-opacity-20 px-4 py-2 rounded-full text-lg">
                      最新视频
                  </span>
              </div>
            </div>
          </div>
        </div>
      </FadeInComponent>
      {/* filter and bloglist */}
      <div className="flex gap-8 pt-8 pb-20 max-w-7xl mx-auto px-5">
        <FadeInComponent delay={100} direction="right">
          <aside className="hidden md:block w-64 flex-shrink-0">
            <ThemeFilter 
              themes={themes}
              selectedTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
            />
          </aside>
          </FadeInComponent>
        
        
        <main className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {paginatedBlogs.map((blog, index) => (
              <FadeInComponent key={blog._id} delay={index * 100} direction="left">
                <BlogThumbnail key={blog._id} blog={blog} onClick={handleBlogClick} />
              </FadeInComponent>
            ))}
          </div>
          
          {paginatedBlogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found for the selected theme.</p>
            </div>
          )}
            <Pagination
              items={filteredBlogs}
              itemsPerPage={9}
              onPageChange={handlePageChange}
            />
        </main>
      </div>
      
      {notification && (
        <UpdateNotification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

export default BlogList
