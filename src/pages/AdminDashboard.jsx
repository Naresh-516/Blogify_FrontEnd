import React from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet /> 
      </div>
    </div>
  )
}

export default AdminDashboard