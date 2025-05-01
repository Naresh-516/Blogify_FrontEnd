
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginAdmin } from "../service/adminService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Validation Schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AdminLogin = () => {
  const {login}=useAuth();
  const navigate=useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await loginAdmin(values); 
     
      toast.success("Login successful!");
      login(response.data,response.token);
     
      resetForm();
     navigate(`/AdminDashboard`)
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Login
          </button>
          <div>
      <button
        type="button"
        onClick={() => navigate('/user-login')}
        className="text-sm text-blue-700 underline"
      >
       user Login?
      </button>
    </div>

        </Form>
      </Formik>
    </div>
  );
};

export default AdminLogin;

