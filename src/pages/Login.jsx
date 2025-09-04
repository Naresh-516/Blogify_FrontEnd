import { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginUser } from "../service/authService"; // We'll create this function next
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Validation Schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const {login}=useAuth();
  const navigate=useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await loginUser(values); 
     console.log(response);
      toast.success("Login successful!");
      login(response.data,response.data.token);
     
    resetForm();
     navigate(`/userDashboard/${response.data.id}`)
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4 ">
          <Field
            name="email"
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

          <Field
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
          />
          <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

          <div className="flex justify-center">
  <button
    type="submit"
    className="w-30 bg-green-600 text-white p-2 rounded hover:bg-green-700"
  >
    Login
  </button>
</div>
          <div className="flex justify-around">
      <button
        type="button"
        onClick={() => navigate('/register')}
        className="text-sm text-blue-700 underline"
      >
        New User?
      </button>
      <button
        type="button"
        onClick={() => navigate('/admin-login')}
        className="text-sm text-blue-700 underline"
      >
        Admin
      </button>
    </div>

        </Form>
      </Formik>
    </div>
  );
};

export default Login;

