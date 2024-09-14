import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../../helper/validate.js';
import { registerUser } from '../../helper/helper.js';
import "./register.css"

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>
      });

      registerPromise.then(() => navigate('/'));
    }
  });

  return (
    <div className="container">
      <div className="glass">
        <div className="title">
          <h4>Register</h4>
          <span>Book Car Park Now.</span>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="textbox">
            <input name="email" value={formik.values.email} onChange={formik.handleChange} type="text" placeholder='Email*' />
            <input name="username" value={formik.values.username} onChange={formik.handleChange} type="text" placeholder='Username*' />
            <input name="password" value={formik.values.password} onChange={formik.handleChange} type="text" placeholder='Password*' />
            <button type='submit'>Register</button>
          </div>
          <div className="text-center py-4">
            <span>Already Registered? <Link to="/login">Login Now</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}
