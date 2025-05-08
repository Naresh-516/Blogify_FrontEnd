import React, { useEffect, useState } from 'react';
import { getAllBlogs, deleteBlog, admindeleteBlog } from '../service/blogService';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function AllBlogs() {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ loading state added
  const location = useLocation();
  const isAdminDashboard = location.pathname.includes('adminDashboard');

  const fetchBlogs = async () => {
    setLoading(true); // start loading
    try {
      const blogs = await getAllBlogs();
      setAllBlogs(blogs.data || []);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setAllBlogs([]);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    try {
      const delblog = await admindeleteBlog(blogId);
      toast.success(delblog.data);
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen py-10 px-4">
      {loading ? (
        <h3 className="text-center text-xl font-bold mt-10">Loading blogs...</h3> // ⬅️ loading message
      ) : allBlogs.length === 0 ? (
        <h3 className="text-center text-xl font-bold mt-10">No Blogs Present</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map(blog => (
            <div
              key={blog.id}
              className="p-6 bg-white rounded-2xl shadow-2xl border-2 border-blue-200 hover:shadow-blue-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <h2 className="font-extrabold text-2xl text-blue-800 mb-2">{blog.title}</h2>
                <p className="text-gray-500 text-sm mb-4">Posted by: {blog.userName} , {new Date(blog.postedAt).toLocaleString()}</p>
                
                <p className="text-gray-700 mb-4 line-clamp-4">{blog.content}</p>
              </div>
              <div className="mt-auto">
                <p className="text-blue-500 italic text-sm mb-4">
                  {blog.tags.split(",").map(tag => `#${tag.trim()} `)}
                </p>
                {isAdminDashboard && (
                  <button
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full w-full transition-all"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllBlogs;
