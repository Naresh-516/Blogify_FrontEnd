import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { changePassword } from "../service/userService";
import { useParams } from "react-router-dom";

const UpdatePassword = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const {id}=useParams();

  const validationSchema = Yup.object({
    oldPassword: Yup.string()
      .required("Old password is required")
      .min(6, "Password must be at least 6 characters"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await changePassword(id,values);
      toast.success("Password updated successfully!");
      resetForm();
    } catch (error) {
      toast.error(error || "Failed to update password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white bg-gradient-to-br from-blue-200 to-white rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-4">
          <div>
            <Field
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="oldPassword" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <Field
              type="password"
              name="newPassword"
              placeholder="New Password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="newPassword" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Password
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default UpdatePassword;
