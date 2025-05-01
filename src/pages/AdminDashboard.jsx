import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-3/4 p-6">
        <Outlet /> 
      </div>
    </div>
  )
}

export default AdminDashboard