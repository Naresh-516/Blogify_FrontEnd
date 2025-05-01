import React, { useState } from 'react'
import NavBar from './components/NavBar'
import {  Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogForm from './pages/BlogForm'
import { ToastContainer } from 'react-toastify'
import UserDashboard from './pages/UserDashboard'
import 'react-toastify/dist/ReactToastify.css'
import AllBlogs from './components/AllBlogs'
import UserBlogs from './components/UserBlogs'
import UserProfile from './components/UserProfile'
import UpdatePassword from './components/UpdatePassword'
import DeleteAccount from './components/DeleteAccount'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ViewUsers from './components/ViewUsers'
import DeletedBlogs from './components/DeletedBlogs'
function App() {

  return (
    <div>
      
      <NavBar/>
      <ToastContainer/>
      <Routes>
      <Route path="/" element={<AllBlogs/>} />
      <Route path="/home" element={<AllBlogs/>} />
        <Route path="user-login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="userDashboard/:id" element={<UserDashboard/>}>
        <Route index element={<AllBlogs />} />
        <Route path="create-blog" element={<BlogForm/>} />
        <Route path="view-blogs" element={<AllBlogs/>} />
        <Route path="my-blogs" element={<UserBlogs/>} />
           <Route path="view-profile" element={<UserProfile />} />
           <Route path="change-password" element={<UpdatePassword />} />
           <Route path="delete" element={<DeleteAccount />} />
          </Route>
          <Route path="admin-login" element={<AdminLogin/>}/>
          <Route path="adminDashboard" element={< AdminDashboard/>}>
          <Route index element={<AllBlogs />} />
          <Route path="view-blogs" element={<AllBlogs />} />
           <Route path="view-users" element={<ViewUsers />} />
           <Route path="view-users/:id/blogs" element={<UserBlogs />} />
           <Route path="deleted-blogs" element={<DeletedBlogs />} />
          </Route>
      </Routes>
      </div>
  )
}

export default App