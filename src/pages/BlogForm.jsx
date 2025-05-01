import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { postBlog } from '../service/blogService';
import { toast } from 'react-toastify';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    title: '',
    content: '',
    tags: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tags: Yup.string().required("At least one tag is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const newBlog = {
      title: values.title,
      content: values.content,
      tags: values.tags,
      userId: id,
    };
  
    try {
      console.log(newBlog);
      await postBlog(newBlog);
      toast.success("Blog posted successfully!");
      resetForm();
      navigate(`/home`); 
    } catch (error) {
      console.error("Blog post failed:", error);
      toast.error("Blog post failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 to-white px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-2xl border-2 border-blue-300">
        <h2 className="text-3xl font-extrabold text-center text-amber-700 mb-8">Write a Blog</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form className="space-y-6">
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter blog title"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Content</label>
              <Field
                as="textarea"
                name="content"
                rows="6"
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <ErrorMessage name="content" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Tags (comma separated)</label>
              <Field
                type="text"
                name="tags"
                placeholder="e.g., technology, coding, life"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <ErrorMessage name="tags" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 hover:bg-amber-400 text-white py-3 rounded-full font-bold transition duration-300"
            >
              Post Blog
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default BlogForm;
