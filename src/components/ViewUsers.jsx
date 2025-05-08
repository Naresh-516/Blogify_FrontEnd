import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../service/adminService';
import { useNavigate } from 'react-router-dom';

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const usersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleBlogs = (id, userName) => {
    navigate(`/adminDashboard/view-users/${id}/blogs`, { state: { userName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700">
        User Management
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="shadow-lg rounded-xl bg-white">
            <div className="overflow-x-auto">
              <table className="min-w-max table-auto w-full">
                <thead className="bg-blue-100 text-blue-800 uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">User Id</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Email</th>
                    <th className="py-3 px-6 text-left">Phone Number</th>
                    <th className="py-3 px-6 text-left">Address</th>
                    <th className="py-3 px-6 text-center">No of Blogs</th>
                    <th className="py-3 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-medium">
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr
                        key={user.userId}
                        className="border-b hover:bg-blue-50 transition duration-300"
                      >
                        <td className="py-4 px-6">{user.userId}</td>
                        <td className="py-4 px-6">{user.name || "N/A"}</td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">{user.mobile || "N/A"}</td>
                        <td className="py-4 px-6">{user.address || "N/A"}</td>
                        <td className="py-4 px-6 text-center">
                          {Array.isArray(user.blogs) ? user.blogs.length : 0}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleBlogs(user.userId, user.name)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-4 rounded-full transition duration-300 text-sm"
                          >
                            View Blogs
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`h-10 w-10 rounded-full border-2 flex items-center justify-center font-semibold ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white border-blue-500"
                    : "text-blue-500 bg-white hover:bg-blue-100 border-blue-300"
                } transition duration-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ViewUsers;
