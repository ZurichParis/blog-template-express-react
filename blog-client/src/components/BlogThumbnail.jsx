function BlogThumbnail({ blog, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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

  const videoId = getYouTubeVideoId(blog.youtubeLink);
  const thumbnails = videoId ? getYouTubeThumbnails(videoId) : null;

  return (
    <div 
      className="bg-[#f8f9fa] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(blog)}
    >
      <img 
        src={thumbnails?.medium} 
        alt={blog.title}
        className="w-full aspect-video object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {blog.level}
          </span>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {blog.duration}
          </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(blog.createdAt)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {blog.title}
        </h3>
      </div>
    </div>
  )
}

export default BlogThumbnail