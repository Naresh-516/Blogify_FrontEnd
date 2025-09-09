import React, { useEffect, useState } from 'react';
import { getAllBlogs, admindeleteBlog,toggleLike } from '../service/blogService';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// ✅ Import images
import likeIcon from '../assets/Like.png';
import likedIcon from '../assets/Liked.png';
import commentIcon from '../assets/Comment.png';

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminDashboard = location.pathname.includes('adminDashboard');
  const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;
  
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const blogs = await getAllBlogs();
      const blogList = blogs.data || [];
      setAllBlogs(blogList);

      if (searchQuery) {
        const filtered = blogList.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery) ||
          blog.content.toLowerCase().includes(searchQuery) ||
          blog.tags.toLowerCase().includes(searchQuery)
        );
        setFilteredBlogs(filtered);
      } else {
        setFilteredBlogs(blogList);
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setAllBlogs([]);
      setFilteredBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery]);

  const handleDelete = async (blogId) => {
    try {
      const delblog = await admindeleteBlog(blogId);
      toast.success(delblog.data);
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };


   const handleLikeToggle = async (blogId) => {
    if (likeLoading) return;
    setLikeLoading(true);
    try {
        const response = await toggleLike(blogId);  // one API call
        toast.success("Like status updated!");
        console.log("Updated Blog:", response.data);
        setFilteredBlogs(prevBlogs =>
            prevBlogs.map(b =>
                b.id === blogId ? response.data : b
            )
        );
    } catch (error) {
        console.error("Error toggling like:", error);
        toast.error("Failed to update like");
    } finally {
        setLikeLoading(false);
    }
};
  // ✅ Navigate to comment page
  const handleComment = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4">
      {loading ? (
        <h3 className="text-center text-xl font-bold mt-10">Loading blogs...</h3>
      ) : filteredBlogs.length === 0 ? (
        <h3 className="text-center text-xl font-bold mt-10">No Blogs Found</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="p-6 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 hover:shadow-blue-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <h2 className="font-extrabold text-2xl text-blue-800 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-500 text-sm mb-4">
                  Posted by: {blog.userName}, {new Date(blog.postedAt).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-4">{blog.content}</p>
              </div>
              <div className="mt-auto">
                <p className="text-blue-500 italic text-sm mb-4">
                  {blog.tags.split(",").map((tag, index) => (
                    <span key={index}>#{tag.trim()} </span>
                  ))}
                </p>
                <div className="flex items-center justify-between">
                  {/* ✅ Like Button */}
                  <div className="flex items-center space-x-2">
                    <img
                    
                     src={blog.likedUsers?.includes(userId)? likedIcon : likeIcon}
                      alt="like button"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleLikeToggle(blog.id)}
                    />
                    <span>{blog.likeCount}</span>
                  </div>

                  {/* ✅ Comment Button */}
                  <div className="flex items-center space-x-2">
                    <img
                      src={commentIcon}
                      alt="comment button"
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => handleComment(blog.id)}
                    />
                    <span>{blog.comments.length || 0}</span>
                  </div>

                  {/* ✅ Admin Delete Button */}
                  {isAdminDashboard && (
                    <button
                      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full transition-all"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBlogs;
