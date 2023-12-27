import React, { useState } from 'react'
// import style from './Register.module.scss'
import { useFormik } from 'formik'
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from  'react-loader-spinner'
import { Helmet } from 'react-helmet';


export default function Register() {
  
  let navigate = useNavigate()
  let [error , setError]=useState(null)
  const [isLoding , setIsLoding] = useState(false)


  async function regSubmit(values){
      setIsLoding(true)
      let  {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch(
          (err)=>{
            setError(err.response.data.message)
            setIsLoding(false)
        
          }
        )
              
        if(data.message === 'success'){
          setIsLoding(false)
          navigate('/login')
        }
  }

  const validationSchema =yup.object({
    name: yup.string().min(3, 'min length is 3 characters').max(20).required(),
    email: yup.string()
    .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i , "not a valid email")
    .required(),
    password: yup.string().matches(/[A-Z][a-zA-Z0-9]+$/, 'password should start with capital letters').min(6).max(16).required(),
    rePassword: yup.string().oneOf([yup.ref('password')], 'password , repassword not match').required(),
    phone: yup.string().matches(/^(002)?01[0-25][0-9]{8}$/, 'not vaild phone number').required()
  })

  let formik = useFormik({
    initialValues: {
    name: "",
    email:"",
    password:"",
    rePassword:"",
    phone:""
    },
    validationSchema ,
    onSubmit : regSubmit
  })



  return (
    <>
    <Helmet>
      <title>Register</title>
    </Helmet>
      <div className='w-75 mx-auto'>
        <form action="" className='form mt-5' onSubmit={formik.handleSubmit}>
        
        {error != null?<div className='alert alert-danger'>{error}</div> :''}

          <h2 className='mb-3'>Register Now:</h2>

          <div className='mb-3'>
            <label htmlFor="name" className='form-groub'>name:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" id='name' name='name' className='form-control' />
          </div>

          {formik.errors.name && formik.touched.name?
            <div className='alert alert-danger'>{formik.errors.name}</div> : null
          }

          <div className='mb-3'>
            <label htmlFor="email">email:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" id='email' name='email' className='form-control'/>
          </div>

          {formik.errors.email && formik.touched.email?
            <div className='alert alert-danger'>{formik.errors.email}</div> : null
          }

          <div className='mb-3'>
            <label htmlFor="password">password:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" id='password' name='password' className='form-control'/>
          </div>

          {formik.errors.password && formik.touched.password?
            <div className='alert alert-danger'>{formik.errors.password}</div> : null
          }

          <div className='mb-3'>
            <label htmlFor="rePassword">rePassword:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" id='rePassword' name='rePassword' className='form-control'/>
          </div>

          {formik.errors.rePassword && formik.touched.rePassword?
            <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null
          }

          <div className='mb-3'>
            <label htmlFor="phone">phone:</label>
            <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" id='phone' name='phone' className='form-control'/>
          </div>

          {formik.errors.phone && formik.touched.phone?
            <div className='alert alert-danger'>{formik.errors.phone}</div> : null
          }
          
          { isLoding === true ?
            <button className=' btn text-white float-end '>
              <ThreeDots 
              height="20" 
              width="60" 
              radius="9"
              color="#0aad0a" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              />
            </button>
        
            // <span className='btn bg-main text-white float-end '>
            // < i className='fas fa-spinner fa-spin'></i>
            // </span> 
          :<button disabled={! (formik.isValid && formik.dirty)} type="submit" className='btn bg-main text-white float-end '>
            Register
          </button>}
          
          
        </form>
      </div>
    </>
  )
}
