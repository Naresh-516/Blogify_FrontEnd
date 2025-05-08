import React,{useEffect,useState} from 'react'
import {Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function UserDashboard() {
    return (
        <div className="flex max-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-y-auto max-h-screen">
        <Outlet />
      </div>
    </div>
      );
}

export default UserDashboard