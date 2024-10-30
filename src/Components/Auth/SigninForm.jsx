import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi'; // Assuming you are using react-icons for eye icons
import api from '../../Utils/ApiCalls/Api';
import { clearAuth } from '../../Redux/AuthSlice';
import { useDispatch } from 'react-redux';
import FullScreenLoader from '../../Utils/Loading/FullScreenLoader';
import { Alert, Snackbar } from '@mui/material';
import { MdOutlineCopyAll } from 'react-icons/md';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const SigninForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUpClick = async (values) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_LOGIN_URL}`, values);
      const { accessToken, user_role, email, firstName, lastName, mobile } = response.data.user;

      // Store token and role in local storage
      localStorage.setItem('token', accessToken);
      localStorage.setItem('role', user_role);
      localStorage.setItem('email', email);
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('mobile', mobile);

      // Redirect to a protected route after successful login
      navigate('/admin/expense');
      setLoading(false);
    } catch (error) {
      // console.error('Login failed', error);
      setErrorMessage(error.response.data.message);
      setSnackbarOpen(true);
      setLoading(false);
      // console.log(error.response.data.message);
    }
  };

  const handleSignInClick = () => {
    navigate('/sign-up');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
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
    <>
      {loading && <FullScreenLoader />}
      <div className='container' >
        <div className='sign-in-div'>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={(values) => {
              setLoading(true);
              setErrorMessage('');
              // Handle form submission
              console.log(values);

              handleSignUpClick(values);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <p className='title'>Travel Expense Sign-in</p>
                <div>
                  <label htmlFor="email">Email <span style={{ color: 'red' }}>*</span></label>
                  <Field type="email" name="email" className={touched.email && errors.email ? 'error' : ''} />
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
                    Sign-up
                  </button>
                  {/* disabled={isSubmitting} */}
                  <button className='submit' type="submit" >
                    Sign-in
                  </button>
                </div>
                <div className='button-container mr-13'>
                  <NavLink to={"vendor-onbording-login"}>Vendor On-Bording</NavLink>
                  <NavLink to={"vendor-invoicing-login"}>Vendor Invoicing</NavLink>
                </div>
                <div className='button-container mr-13'>
                  <NavLink to={"asn-vendor-login"}>ASN Vendor</NavLink>
                  <NavLink to={"vendor-non-po-login"}>Vendor NON-PO</NavLink>
                </div>
                <div className='button-container mr-13'>
                  <NavLink to={"order-to-cash-login"}>Order to Cash</NavLink>
                  <NavLink to={"gate-pass"}>Gate Pass</NavLink>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert icon={<FiUser />} severity="error" sx={{ width: '100%' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default SigninForm;
