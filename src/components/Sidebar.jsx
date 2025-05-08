import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Sidebar() {
  const { id } = useParams(); // Get user ID from URL

  return (
    <div className="w-1/4 bg-gray-100 p-4 h-screen shadow-md hidden md:block">
      <div className=" bg-gray-200 p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <ul className="space-y-2">
          <li><Link to={`/userDashboard/${id}/create-blog`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">Create Blog</Link></li>
          <li><Link to={`/userDashboard/${id}/view-profile`}className="block p-2   hover:text-blue-600 rounded hover:bg-white">View Profile</Link></li>
          <li><Link to={`/userDashboard/${id}/change-password`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">Change Password</Link></li>
          <li><Link to={`/userDashboard/${id}/my-blogs`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">My Blogs</Link></li>
          <li><Link to={`/userDashboard/${id}/view-blogs`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">All Blogs</Link></li>
          <li><Link to={`/userDashboard/${id}/delete`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">Delete Account</Link></li>
        </ul>
    </div>
    </div>
  );
}

export default Sidebar;
