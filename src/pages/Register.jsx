import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../service/authService';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobile: '',
      address: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
      mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile is required'),
      gender: Yup.string().required('Gender is required'),
      address: Yup.string().required('Address is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await registerUser(values);
       
        toast.success(response.data);
        navigate('/user-login');
      } catch (error) {
        toast.error(error.response?.data || 'Registration failed');
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-amber-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-md m-2" onSubmit={formik.handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">New User Registration</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={formik.values.name}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm">{formik.errors.name}</div>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formik.values.email}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm">{formik.errors.email}</div>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            name="mobile"
            type="text"
            value={formik.values.mobile}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mobile && formik.errors.mobile && <div className="text-red-500 text-sm">{formik.errors.mobile}</div>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formik.values.gender === 'male'}
                className="accent-amber-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              Male
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formik.values.gender === 'female'}
                className="accent-amber-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              Female
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formik.values.gender === 'other'}
                className="accent-amber-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              Other
            </label>
          </div>
          {formik.touched.gender && formik.errors.gender && <div className="text-red-500 text-sm">{formik.errors.gender}</div>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={formik.values.password}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <div className="text-red-500 text-sm">{formik.errors.password}</div>}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            name="address"
            value={formik.values.address}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && <div className="text-red-500 text-sm">{formik.errors.address}</div>}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
