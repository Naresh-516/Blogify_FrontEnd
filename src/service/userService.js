import axios from "axios";
const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/user`

export const  updateUserProfile=async(formData)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.put(`${BASE_URL}/update-profile`,formData,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      }
);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"cannot get at the moment";
    }
  };
  export const  changePassword=async(pwd)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.put(`${BASE_URL}/change-password`,pwd,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"cannot get at the moment";
    }
  };
  export const  deleteAccount=async(data)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.post(`${BASE_URL}/delete`,data,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"cannot get at the moment";
    }
  };