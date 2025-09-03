import axios from "axios";

const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/admin`

export const loginAdmin=async(credentials)=>{
    try{
     
      const responseData=await axios.post(`${BASE_URL}/login`,credentials);
     
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"InValid Credentials";
    }
  };
  export const getAllUsers=async(token)=>{
    try{
      
      const responseData=await axios.get(`${BASE_URL}/all-users-with-blogs`,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"unable to fetch";
    }
  };
  
