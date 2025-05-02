import axios from "axios";
const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/user`
export const  updateUserProfile=async(userId,formData)=>{
    try{
      const responseData=await axios.put(`${BASE_URL}/update-profile/${userId}`,formData);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"cannot get at the moment";
    }
  };
  export const  changePassword=async(userId,pwd)=>{
    try{
      const responseData=await axios.put(`${BASE_URL}/change-password/${userId}`,pwd);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"cannot get at the moment";
    }
  };
  export const  deleteAccount=async(data)=>{
    try{
      const responseData=await axios.post(`${BASE_URL}/delete`,data);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"cannot get at the moment";
    }
  };