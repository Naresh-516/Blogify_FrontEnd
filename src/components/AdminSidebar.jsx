import React from 'react'
import { Link } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className="w-1/4 bg-gray-100 p-4 h-screen shadow-md hidden md:block">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <div className=" bg-gray-200 p-4 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <ul className="space-y-2">
          <li><Link to={`/adminDashboard/view-blogs`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">All Blogs</Link></li>
          <li><Link to={`/adminDashboard/deleted-blogs`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">Deleted Blogs</Link></li>
          <li><Link to={`/adminDashboard/view-users`} className="block p-2   hover:text-blue-600 rounded hover:bg-white">View Users</Link></li>
        </ul>
    </div>
    </div>
  )
}

export default AdminSidebar