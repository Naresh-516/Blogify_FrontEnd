import axios from "axios";
const BASE_URL=`${import.meta.env.VITE_BACKEND_URL}/blog`

export const updateBlog=async(blogId,editContent)=>{
    try{
      const token = localStorage.getItem("token");
      const responseData=await axios.put(`${BASE_URL}/update/${blogId}`,editContent,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to update Blogs";
    }
  };
  export const deleteBlog=async(blogId)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.delete(`${BASE_URL}/delete/blogid/${blogId}`,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch Blogs";
    }
  };
  export const admindeleteBlog=async(blogId)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.delete(`${BASE_URL}/admindelete/blogid/${blogId}`,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch Blogs";
    }
  };
  export const getAllBlogs=async()=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/allblogs`
      );
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to all Fetch Blogs";
    }
  };
  export const postBlog=async(blog)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.post(`${BASE_URL}/create`,blog,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Post Blog";
    }
  };
  export const getuserBlogs=async()=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.get(`${BASE_URL}/myblogs`,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch your Blogs";
    }
  };
  export const getuserBlogsByAdmin=async(userId,token)=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/admin/userblogs/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`, // <-- send the token here
          "Content-Type": "application/json", // optional if sending JSON
        },
      });
      return responseData;
    }catch(error){
      throw error.response?.data?.message||"Failed to Fetch your Blogs";
    }
  };
  export const getDeletedBlogs=async(token)=>{
    try{
      const responseData=await axios.get(`${BASE_URL}/deletedblogs`,{
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
  