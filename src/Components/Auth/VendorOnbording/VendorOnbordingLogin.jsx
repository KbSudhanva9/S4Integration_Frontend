import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './VendorOnbording.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Assuming you are using react-icons for eye icons
import api from '../../../Utils/ApiCalls/Api';

const SigninSchema = Yup.object().shape({
  vid: Yup.string('Invalid Vendor ID').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const VendorOnbordingLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

    const handleVendorLogin = async (values) => {
      navigate('/vendor-onbording/vendor-details');
        // `https://cors-anywhere.herokuapp.com/http://202.153.35.211:50000/sap/opu/odata/sap/ZVENDOR_ONBOARD_SRV/Vendor_loginSet(Username='17300002',Password='TEST@123')`
        // ${import.meta.env.VITE_CROSS_ORIGIN_URL}
        // ===============
        // var loginurl = `${import.meta.env.VITE_CROSS_ORIGIN_URL}${import.meta.env.VITE_VENDOR_ONBORDING_BASE_URL}`+`Vendor_loginSet(Username='${values.vid}',Password='${values.password}')`
        
        // try {
        //     const response = await api.get( loginurl, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             'Authorization': 'Basic ' + btoa( `${import.meta.env.VITE_SAP_USER_NAME}:${import.meta.env.VITE_SAP_PASSWORD}`),
        //             'X-Requested-With': 'XMLHttpRequest' 
        //         }
        //     });
        //     console.log(response);
        // } catch (error) {
        //     console.error('Login failed', error);
        // }
    };

  const handleSignInClick = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
          vid: '',
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
            <p className='center-items'><b>Vendor On-Bording Login</b></p>
            <div>
              <label htmlFor="vid">Email</label>
              <Field type="string" name="vid" className={touched.vid && errors.vid ? 'error' : ''} />
              <ErrorMessage name="vid" component="div" className="error-message" />
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
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className='button-container'>
              <button className='register' type="button" onClick={handleSignInClick}>
                Expense Sign-in
              </button>
              <button className='submit center-items' type="submit" >
                Login
              </button>
            </div>
            <p className='center-items'>
                <b>Don't have an Account ? &nbsp;</b> <NavLink to={'/vendor-onbording-sign-up'}>Register Here</NavLink>
            </p>
            <NavLink className='center-items' to={'/vendor-track-status'}>Track Status</NavLink>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VendorOnbordingLogin;
