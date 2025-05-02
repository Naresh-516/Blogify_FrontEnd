
import axios from 'axios'
  const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/user`
export const registerUser=async(userData)=>{
  try{
    const responseData=await axios.post(`${BASE_URL}/register`,userData);
    return responseData;
  }catch(error){
    throw error.response?.data?.message||"Registration Failed";
  }
};
export const loginUser=async(credentials)=>{
  try{
    const responseData=await axios.post(`${BASE_URL}/login`,credentials);
    return responseData;
  }catch(error){
    throw error.response?.data?.message||"InValid Credentials/UserNotFound";
  }
};

