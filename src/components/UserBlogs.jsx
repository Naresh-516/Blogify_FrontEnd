import React, { useEffect, useState } from 'react';
import { getuserBlogs, deleteBlog, updateBlog, getuserBlogsByAdmin } from '../service/blogService';
import { useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserBlogs() {
  const { id } = useParams();
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');
const token=localStorage.getItem("token");
  const [allBlogs, setAllBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editContent, setEditContent] = useState({});
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true); // Set loading to true before API call
    if(isAdmin){
try {
      const blogs = await getuserBlogsByAdmin(id,token);
      setAllBlogs(blogs.data || []);
      if (blogs.data.length > 0) {
        setUserName(blogs.data[0]?.userName || '');
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setAllBlogs([]);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
    }else{
      try {
      const blogs = await getuserBlogs();
      setAllBlogs(blogs.data || []);
      if (blogs.data.length > 0) {
        setUserName(blogs.data[0]?.userName || '');
      }
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setAllBlogs([]);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await deleteBlog(blogId);
      toast.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog.id);
    setEditContent({
      title: blog.title,
      content: blog.content,
      tags: blog.tags,
    });
  };

  const handleSave = async (blogId) => {
    try {
      const updatedBlog = { 
        ...editContent,
        userId: id,
      };
      await updateBlog(blogId, updatedBlog);
      toast.success("Blog updated successfully");
      setEditingBlog(null);
      fetchBlogs();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update blog");
    }
  };

  const handleChange = (e) => {
    setEditContent({ ...editContent, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-b from-amber-100 to-white min-h-screen py-10 px-4">
      <h2 className="text-indigo-700 text-3xl font-bold text-center mb-8">{userName} Blogs</h2>

      {loading ? (
        <h3 className="text-center text-xl font-bold mt-10">Loading Blogs...</h3> // Show loading message
      ) : allBlogs.length === 0 ? (
        <h3 className="text-center text-xl font-bold mt-10">No Blogs Present</h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogs.map(blog => (
            <div 
              key={blog.id} 
              className="p-6 bg-white rounded-2xl shadow-2xl border-2 border-amber-300 hover:shadow-amber-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              {editingBlog === blog.id ? (
                <>
                  <input
                    type="text"
                    name="title"
                    value={editContent.title}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Title"
                  />
                  <textarea
                    name="content"
                    value={editContent.content}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2 rounded"
                    rows="4"
                    placeholder="Content"
                  />
                  <input
                    type="text"
                    name="tags"
                    value={editContent.tags}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2 rounded"
                    placeholder="Tags (comma separated)"
                  />
                  <div className="flex justify-between mt-4">
                    <button 
                      onClick={() => handleSave(blog.id)} 
                      className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => setEditingBlog(null)} 
                      className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-full"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h2 className="font-extrabold text-2xl text-amber-800 mb-2">{blog.title}</h2>
                    <p className="text-gray-500 text-sm mb-4">Posted on: {new Date(blog.postedAt).toLocaleString()}</p>
                    <p className="text-gray-700 mb-4 max-h-32 overflow-y-auto pr-2">{blog.content}</p>
                  </div>
                  <div className="mt-auto">
                    <p className="text-amber-600 italic text-sm mb-4">
                      {blog.tags.split(',').map(tag => `#${tag.trim()} `)}
                    </p>

                    {!isAdmin && (
                      <div className="flex justify-between mt-2">
                        <button 
                          onClick={() => handleEdit(blog)} 
                          className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-full"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(blog.id)} 
                          className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-full"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBlogs;
