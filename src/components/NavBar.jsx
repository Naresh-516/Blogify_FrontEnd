import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import login from '../assets/login.png';
import logoutIcon from '../assets/logout.png';
import profile from '../assets/profile.png';
import register from '../assets/register.png';

function NavBar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();             
    navigate('/user-login'); 
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <div>
      <nav className="bg-blue-600 p-4 text-white flex justify-around items-center">
        <div className="text-xl font-bold cursor-pointer" onClick={handleHome}>
          BlogWriter
        </div>

        {user ? (
          <div className="flex items-center gap-10 relative">
            <button onClick={handleHome} className="hover:underline">
              Home
            </button>
            <p>Hello, {user.name}</p>
            
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onClick={()=>isDropdownOpen?setDropdownOpen(false):setDropdownOpen(true)}
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
                  {user?.name === "Admin"? (
                    <>
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
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-10">
            <Link to="/user-login" className="hover:underline flex items-center gap-2">
              <img src={login} alt="login" width="20" height="20" />
              Login
            </Link>
            <Link to="/register" className="hover:underline flex items-center gap-2">
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
