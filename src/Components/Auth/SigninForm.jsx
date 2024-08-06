import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Assuming you are using react-icons for eye icons
import api from '../../Utils/ApiCalls/Api';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const SigninForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignUpClick  = async (values) => {
    try {
      const response = await api.post( `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`, values);
      const { accessToken, user_role } = response.data.user;

      // Store token and role in local storage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', user_role);

      // Redirect to a protected route after successful login
      navigate('/home');
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  
  const handleSignInClick = () => {
    navigate('/sign-up');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className='sign-in-div'>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);

          handleSignUpClick(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <p className='title'>Sign-in</p>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className={touched.email && errors.email ? 'error' : ''} />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={touched.password && errors.password ? 'error' : ''}
                />
                <span className="toggle-password" onClick={togglePasswordVisibility}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              {/* <ErrorMessage name="password" component="div" className="error-message" /> */}
            </div>
            <div className='button-container'>
              <button className='register' type="button" onClick={handleSignInClick}>
                Sign-up
              </button>
              {/* disabled={isSubmitting} */}
              <button className='submit' type="submit" >
                Sign-in
              </button>
            </div>
            <div className='button-container'>
              <NavLink to={"vendor-onbording-login"}>Vendor On-Bording</NavLink>
              <NavLink to={"vendor-invoicing-login"}>Vendor Invoicing</NavLink>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
