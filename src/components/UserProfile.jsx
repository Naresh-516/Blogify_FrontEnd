import { useContext, useEffect, useState } from "react";
import { updateUserProfile } from "../service/userService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user,login } = useAuth();
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
   
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        gender: user.gender,
        mobile: user.mobile,
      });
    }
  }, [user]);
  useEffect(() => {
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response=await updateUserProfile(formData);
      login(response.data,localStorage.getItem("token"));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Update Error:", err.response?.data || err.message);
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white bg-gradient-to-br from-blue-200 to-white rounded">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>

      <form className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email || ""}
          disabled
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="address"
          value={formData.address || ""}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="gender"
          value={formData.gender || ""}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Gender"
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="mobile"
          value={formData.mobile || ""}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Mobile Number"
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-between mt-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
