import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import api from '../../../Utils/ApiCalls/Api';
import { useDispatch } from 'react-redux';
import { clearAuth, setAuth } from '../../../Redux/AuthSlice';
import FullScreenLoader from '../../../Utils/Loading/FullScreenLoader';
import { Alert, Snackbar } from '@mui/material';


const SigninSchema = Yup.object().shape({
  vid: Yup.string('Invalid Vendor ID').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const ASNVendorLogin = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar
  const [errorMessage, setErrorMessage] = useState('');

  const handleVendorLogin = async (values) => {
    var loginurl = `${import.meta.env.VITE_BASE_URL}` + '/sap/login';
    try {
      const response = await api.post(loginurl,
        {
          "username": `${values.vid}`,
          "password": `${values.password}`
        }
      );
      // console.log(response.data.user);
      // localStorage.setItem('token', response.data.user.accessToken);

      dispatch(setAuth({
        token: response.data.user.accessToken,
        user: response.data.user.Username
      }));

      navigate('/asn-vendor/home');
      setLoading(false);
    } catch (error) {
      // console.error('Login failed', error);
      setErrorMessage(error.response.data.message);
      setSnackbarOpen(true);
      setLoading(false);
    }
  };

  const handleSignInClick = () => {
    navigate('/');
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
      <div className='sign-in-div'>
        <Formik
          initialValues={{
            vid: '',
            password: '',
          }}
          validationSchema={SigninSchema}
          onSubmit={(values) => {
            setLoading(true);
            setErrorMessage('');
            // Handle form submission
            //   console.log(values);

            handleVendorLogin(values);
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <p className='center-items'><b>ASN Vendor Login</b></p>
              <div>
                <label htmlFor="vid">Vendor ID <span style={{ color: 'red' }}>*</span></label>
                <Field type="string" name="vid" className={touched.vid && errors.vid ? 'error' : ''} />
                {/* <ErrorMessage name="vid" component="div" className="error-message" /> */}
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
    </>
  );
};

export default ASNVendorLogin;
