import React from 'react'
import { deleteAccount } from '../service/userService';
import { toast } from 'react-toastify';
import { Form, Formik, ErrorMessage, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';

function DeleteAccount() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid Email').required('Email Required'),
        password: Yup.string().required('Password Required')
    });

    const handleSubmit = async (values) => {
        try {
            console.log(values);
            const response = await deleteAccount(values);
            toast.success(response.data);
            logout();
            navigate('/user-login');
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-gray-500  bg-gradient-to-br from-blue-200 to-white rounded">
            <h2 className="text-2xl font-bold mb-4 text-center">Confirm Details</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
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
                        className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700"
                    >
                        Delete Account
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default DeleteAccount;
