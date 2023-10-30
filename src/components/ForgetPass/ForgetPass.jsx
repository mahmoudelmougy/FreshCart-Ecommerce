import React, { useState } from "react";
import style from "./ForgetPass.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgetPass() {
  let navigate = useNavigate()
  let [error, setError] = useState(null);

  async function sendemail(values) {
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
      });
    console.log(data);
    if (data.statusMsg === "success") {
      navigate("/ResetCode");
    }
  }

  const validationSchema = yup.object({
    email: yup.string().email("wrong email").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendemail,
  });

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>

      <h2 className=" w-50 mx-auto">Forget Password:</h2>

      <form className="form w-50 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">please enter your email:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control mt-2"
          type="email"
          id="email"
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger mt-2">{formik.errors.email}</div>
        ) : null}

        {error != null ? <div className="alert alert-danger mt-2">{error}</div> : ""}

        <button
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
          className="btn bg-main text-white mt-3 "
        >
          send
        </button>
      </form>
    </>
  );
}
