import axios from "axios";
const BASE_URL="http://localhost:8080/Blog-Writer-api/admin"
export const loginAdmin=async(credentials)=>{
    try{
      const responseData=await axios.post(`${BASE_URL}/login`,credentials);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"InValid Credentials";
    }
  };
  export const getAllUsers=async()=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/all-users-with-blogs`);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"unable to fetch";
    }
  };
  
