import ReactMarkdown from 'react-markdown'

function BlogDetail({ blog, relatedBlogsNamesIds, handleBlogIdClick }) {
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&mute=1` : null
  }

  const embedUrl = getYouTubeEmbedUrl(blog.youtubeLink)

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      {/* Banner */}
      <div className="mt-12 w-full py-5 bg-[linear-gradient(135deg,_rgb(102,_126,_234)_0%,_rgb(118,_75,_162)_100%)]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex text-[#f8f9fa] items-center">
          <p className="text-5xl font-bold mt-5 leading-relaxed tracking-wide">{blog.title}</p>
        </div>
        <div className="max-w-7xl mx-auto flex px-4 text-[#f8f9fa] items-center mb-5 gap-1 hidden md:block">
          <div className="mr-1 gap-1 flex">
            <span className="inline-block bg-blue-100 opacity-50 text-blue-800 font-semibold tracking-wider px-3 py-1 rounded-full">
              {blog.level}
            </span>
            <span className="inline-block bg-blue-100 opacity-50 text-blue-800 font-semibold tracking-wider px-3 py-1 rounded-full">
              {blog.theme}
            </span>
            <span className="inline-block bg-blue-100 opacity-50 text-blue-800 font-semibold tracking-wider px-3 py-1 rounded-full">
              {blog.duration}
            </span>
            <span className="inline-block bg-blue-100 opacity-50 text-blue-800 font-semibold tracking-wider px-3 py-1 rounded-full">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      {/* Video section*/}
      <div className="overflow-hidden max-w-7xl px-4 flex flex-col md:flex-row items-stretch mx-auto py-8 gap-2">
        <iframe
          src={embedUrl}
          title={blog.title}
          className="aspect-video rounded-lg md:w-2/3 w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <div className="flex-1 hidden md:block bg-gray-200">
            <div className="flex items-center justify-center rounded-lg p-4">
                <div className="text-[#333] py-2">
                    <span className="tracking-wider text-lg font-semibold bg-blue-100 text-blue-800 px-4 py-2 rounded-full">✏️笔记见下方</span>
                </div>
            </div>
        </div>
      </div>
      {/* Content */}
      <article className="max-w-7xl mx-auto py-2 px-5">
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </div>
          {/* related blogs */}
          <h2 className="text-2xl font-bold pt-4 tracking-wider text-blue-800">相关视频链接</h2>
          <div className="max-w-4xl py-4 flex gap-1 flex-wrap">
            {relatedBlogsNamesIds.map((blog) => (
              <button onClick={() => handleBlogIdClick(blog.id)} key={blog.id} className="text-blue-800 hover:text-blue-600 hover:bg-blue-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-300 cursor-pointer font-semibold tracking-wider rounded-full px-4 py-2 bg-blue-100">{blog.name}</button>
            ))}
          </div>
      </article>
    </div>
  )
}

export default BlogDetail