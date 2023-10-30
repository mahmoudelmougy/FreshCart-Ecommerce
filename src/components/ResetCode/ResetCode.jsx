import React, { useState } from "react";
import style from "./ResetCode.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function ResetCode() {
  let navigate = useNavigate();
  let [error, setError] = useState(null);

  async function sendCode(values) {
    let { data } = await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      )
      .catch((err) => {
        setError(err.response.data.message);
      });
    console.log(data);
    if (data.status === "Success") {
      navigate("/ResetPassword");
    }
  }

  const validationSchema = yup.object({
    resetCode: yup.string().required("you can't change your password without reset code"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  return (
    <>
      <Helmet>
        <title>Reset Code</title>
      </Helmet>

      <h2 className=" w-50 mx-auto">Reset Code:</h2>

      <form className="form w-50 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="resetCode">please enter the reset code:</label>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control mt-2"
          type="text"
          id="resetCode"
          value={formik.values.resetCode}
        />
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div className="alert alert-danger mt-2">{formik.errors.resetCode}</div>
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
          send
        </button>
      </form>
    </>
  );
}
