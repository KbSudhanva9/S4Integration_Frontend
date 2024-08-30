import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
// import api from '../../../Utils/ApiCalls/Api';
import { useDispatch } from 'react-redux';
import { clearAuth, setAuth } from '../../../Redux/AuthSlice';
import api from '../../../Utils/ApiCalls/Api';


const SigninSchema = Yup.object().shape({
  email: Yup.string('Invalid Vendor ID').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const OrderToCashLogin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleVendorLogin = async (values) => {

    // const response = await api.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`, values);

    var loginurl = `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`;
    // var loginurl = `${import.meta.env.VITE_BASE_URL}` + '/sap/login';
    try {
      const response = await api.post(loginurl,
        {
          "email": `${values.email}`,
          "password": `${values.password}`
        }
      );
      // console.log(response.data.user);
      // localStorage.setItem('token', response.data.user.accessToken);

      dispatch(setAuth({
        token: response.data.user.accessToken,
        user: response.data.user.Username
      }));

      navigate('/order-to-cash/create');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleSignInClick = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    dispatch(clearAuth());
    localStorage.removeItem('auth');
    localStorage.clear();
  }, [])

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/home');
  //   }
  // }, [navigate]);

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
          //   console.log(values);

          handleVendorLogin(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <p className='center-items'><b>Order to Cash Login</b></p>
            <div>
              <label htmlFor="email">Email ID <span style={{ color: 'red' }}>*</span></label>
              <Field type="string" name="email" className={touched.email && errors.email ? 'error' : ''} />
              {/* <ErrorMessage name="email" component="div" className="error-message" /> */}
            </div>
            <div>
              <label htmlFor="password">Password <span style={{ color: 'red' }}>*</span></label>
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
                Expense Sign-in
              </button>
              <button className='submit center-items' type="submit" >
                Login
              </button>
            </div>
            {/* <p className='center-items'>
              <b>Don't have an Account ? &nbsp;</b> <NavLink to={'/vendor-onbording-sign-up'}>Register Here</NavLink>
            </p>
            <NavLink className='center-items' to={'/vendor-track-status'}>Track Status</NavLink> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrderToCashLogin;
