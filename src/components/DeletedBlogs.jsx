import React, { useEffect, useState } from 'react'
import { getDeletedBlogs } from '../service/blogService'
import { useAuth } from '../context/AuthContext';


function DeletedBlogs() {
    const [allBlogs, setAllBlogs] = useState([]);
    const {token}=useAuth();
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const blogs = await getDeletedBlogs(token);
          setAllBlogs(blogs.data|| []); // fallback to empty array
        } catch (error) {
          console.error("Failed to fetch blogs", error);
          setAllBlogs([]); // set empty array on error
        }
      };
  
      fetchBlogs();
    }, []);
    return (
      <div className="bg-gradient-to-b rounded  from-amber-100 to-white min-h-screen py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allBlogs.length==0?"No Deleted Blogs":allBlogs.map(blog => (
          <div 
            key={blog.id} 
            className="p-6 bg-white rounded-2xl shadow-2xl border-2 border-amber-300 hover:shadow-amber-400 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <h2 className="font-extrabold text-2xl text-amber-800 mb-2">{blog.title}</h2>
              <p className="text-gray-500 text-sm mb-4">Posted on: {new Date(blog.postedAt).toLocaleString()}</p>
              <p className="text-gray-700 mb-4 max-h-32 overflow-y-auto pr-2">{blog.content}</p>
            </div>
            <div className="mt-auto">
              <p className="text-amber-600 italic text-sm mb-4">
                {blog.tags.split(',').map(tag => `#${tag.trim()} `)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    
      );
    }

export default DeletedBlogs