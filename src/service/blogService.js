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
  export const getBlogById = async (blogId) => {
    const token = localStorage.getItem("token");
    return await axios.get(`${BASE_URL}/getblog/${blogId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
export const toggleLike = async (blogId) => {
    try {
        const token = localStorage.getItem("token");
        const responseData = await axios.post(
            `${BASE_URL}/${blogId}/like-toggle`, // Correct URL
            {}, // Empty body if not sending any data
            {
                headers: { 
                    Authorization: `Bearer ${token}`, // Token here
                    "Content-Type": "application/json", // optional
                },
            }
        );
        return responseData;
    } catch (error) {
        throw error.response?.data?.message || "Unable to like";
    }
};


  export const addComment=async(comment)=>{
    try{
       const token = localStorage.getItem("token");
      const responseData=await axios.post(`${BASE_URL}/comment`,comment,{
        headers: { 
          Authorization: `Bearer ${token}`, // <-- send the token here  
          "Content-Type": "application/json", // optional if sending JSON
        },      
      });
      return responseData;
    }   
    catch(error){
      throw error.response?.data?.message||"unable to add comment";
    }   
  };
  export const editComment = async (commentId, blogId, updatedContent) => {
    try {
        const token = localStorage.getItem("token");
        const requestBody = {
            blogId: blogId,
            commentId: commentId,
            updatedContent: updatedContent
        };
        const responseData = await axios.put(`${BASE_URL}/editcomment`, requestBody, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return responseData;
    } catch (error) {
        throw error.response?.data?.message || "Unable to edit comment";
    }
};
export const deleteComment = async (blogId, commentId) => {
    try {
        const token = localStorage.getItem("token");
        const responseData = await axios.delete(
            `${BASE_URL}/deletecomment/${blogId}/${commentId}`, // <-- fixed URL
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return responseData;
    } catch (error) {
        throw error.response?.data?.message || "Unable to Delete comment";
    }
};

  
  