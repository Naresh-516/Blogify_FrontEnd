import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import login from '../assets/login.png';
import register from '../assets/register.png';
import profile from '../assets/profile.png';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/user-login');
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/home?search=${searchQuery}`);
      setSearchQuery("");
    }else{
      navigate(`/home`)
    }
  };
  const showSearch = location.pathname === "/" || location.pathname === "/home";

  return (
    <div>
      <nav className="bg-blue-600 p-4 text-white flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={handleHome}
        >
          Blogify
        </div>

        {/* ✅ Search Bar only visible in /home */}
        {showSearch && (
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 w-full md:w-1/3"
          >
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-2 py-1 rounded-lg text-black outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-400"
            >
              Search
            </button>
          </form>
        )}

        {/* Authenticated / Non-authenticated Navigation */}
        {user ? (
          <div className="flex items-center justify-between gap-4 md:gap-10 w-full md:w-auto">
            <button onClick={handleHome} className="hover:underline">
              Home
            </button>
            <p>Hello, {user.name}</p>

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={profile}
                alt="Profile Icon"
                width="30"
                height="30"
                className="cursor-pointer rounded-full border-2 border-white"
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                  {user?.name === 'Admin' ? (
                    <>
                      <div className="hidden md:block">
                        <Link
                          to={`/adminDashboard`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Admin's Dashboard
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                      <div className="block md:hidden">
                        <ul>
                          <li>
                            <Link
                              to={`/adminDashboard/view-blogs`}
                              className="block p-2 hover:text-blue-600 rounded hover:bg-white"
                            >
                              All Blogs
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/adminDashboard/deleted-blogs`}
                              className="block p-2 hover:text-blue-600 rounded hover:bg-white"
                            >
                              Deleted Blogs
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/adminDashboard/view-users`}
                              className="block p-2 hover:text-blue-600 rounded hover:bg-white"
                            >
                              View Users
                            </Link>
                          </li>
                        </ul>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block">
                        <Link
                          to={`/userDashboard/${user.id}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          User's Dashboard
                        </Link>
                        <Link
                          to={`/userDashboard/${user.id}/view-profile`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                      <div className="block md:hidden">
                        <ul className="space-y-2">
                          <li>
                            <Link
                              to={`/userDashboard/${user.id}/create-blog`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Create Blog
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/userDashboard/${user.id}/view-profile`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              View Profile
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/userDashboard/${user.id}/change-password`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Change Password
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/userDashboard/${user.id}/my-blogs`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              My Blogs
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/userDashboard/${user.id}/view-blogs`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              All Blogs
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/userDashboard/${user.id}/delete`}
                              className="block px-4 py-2 hover:bg-gray-100"
                            >
                              Delete Account
                            </Link>
                          </li>
                        </ul>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-around gap-4 md:gap-10 w-full md:w-auto">
            <Link
              to="/user-login"
              className="hover:underline flex items-center gap-2"
            >
              <img src={login} alt="login" width="20" height="20" />
              Login
            </Link>
            <Link
              to="/register"
              className="hover:underline flex items-center gap-2"
            >
              <img src={register} alt="register" width="20" height="20" />
              Register
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
