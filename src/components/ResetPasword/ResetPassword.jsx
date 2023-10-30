import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ResetPassword() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);

  async function changePassword(values) {
    let { data } = await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
    console.log(data);
    if (data.token) {
      navigate("/login");
    }
  }

  const validationSchema = yup.object({
    email: yup.string().email("email not vaild").required("email is required"),
    newPassword: yup.string().matches(/[A-Z][a-z0-9]{4,20}$/, "not valid").required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: changePassword
  });

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <h2 className=" w-50 mx-auto">Reset Password:</h2>

      <form className="form w-50 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode">email:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control mt-2 mb-3"
          type="email"
          id="email"
          value={formik.values.email}
          
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger mt-2">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="resetCode">newPassword:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control mt-2"
          type="password"
          id="newPassword"
          value={formik.values.newPassword}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <div className="alert alert-danger mt-2">{formik.errors.newPassword}</div>
        ) : null}



        {error != null ? (
          <div className="alert alert-danger mt-2">{error}</div>
        ) : (
          ""
        )}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white mt-3 "
        >
          Reset Password
        </button>
      </form>
    </>
  );
}
