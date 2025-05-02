import axios from "axios";
const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/blog`
export const updateBlog=async(blogId,editContent)=>{
    try{
      const responseData=await axios.put(`${BASE_URL}/update/${blogId}`,editContent);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to update Blogs";
    }
  };
  export const deleteBlog=async(blogId)=>{
    try{
      const responseData=await axios.delete(`${BASE_URL}/delete/blogid/${blogId}`,);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch Blogs";
    }
  };
  export const admindeleteBlog=async(blogId)=>{
    try{
      const responseData=await axios.delete(`${BASE_URL}/admindelete/blogid/${blogId}`,);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch Blogs";
    }
  };
  export const getAllBlogs=async()=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/allblogs`);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to all Fetch Blogs";
    }
  };
  export const postBlog=async(blog)=>{
    try{
      const responseData=await axios.post(`${BASE_URL}/create`,blog);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Post Blog";
    }
  };
  export const getuserBlogs=async(userId)=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/user/${userId}`);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch your Blogs";
    }
  };
  export const getDeletedBlogs=async()=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/deletedblogs`);
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"unable to fetch";
    }
  };
  