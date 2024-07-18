import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  dob: Yup.date().required('Required'),
  mobile: Yup.string().matches(/^[0-9]{10}$/, 'Invalid mobile number').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  address_line1: Yup.string().max(255, 'Max length exceeded').required('Required'),
  address_line2: Yup.string().max(255, 'Max length exceeded').required('Required'),
  pincode: Yup.string().matches(/^[0-9]{6}$/, 'Invalid pincode').required('Required'),
  password: Yup.string().min(6, 'Password too short').max(50, 'Password too long').required('Required'),
  confpass: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleSigninClick = () => {
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword((prevShowConfPassword) => !prevShowConfPassword);
  };

  return (
    <div style={{ marginTop: '70%', marginBottom: '5%' }}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          dob: '',
          mobile: '',
          email: '',
          address_line1: '',
          address_line2: '',
          pincode: '',
          password: '',
          confpass: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // Handle form submission

          const { confpass, ...rest } = values;

          console.log(rest);
          
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <p className='title'>Signup</p>
            <div className='button-container'>
              <div>
                <label htmlFor='firstName'>First Name</label>
                <Field type='text' name='firstName' className={touched.firstName && errors.firstName ? 'error' : ''} />
                {/* <ErrorMessage name='firstName' component='div' className='error-message' /> */}
              </div>
              <div>
                <label htmlFor='lastName'>Last Name</label>
                <Field type='text' name='lastName' className={touched.lastName && errors.lastName ? 'error' : ''} />
                {/* <ErrorMessage name='lastName' component='div' className='error-message' /> */}
              </div>
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <Field type='email' name='email' className={touched.email && errors.email ? 'error' : ''} />
              {/* <ErrorMessage name='email' component='div' className='error-message' /> */}
            </div>
            <div>
              <label htmlFor='mobile'>Mobile</label>
              <Field type='text' name='mobile' className={touched.mobile && errors.mobile ? 'error' : ''} />
              {/* <ErrorMessage name='mobile' component='div' className='error-message' /> */}
            </div>
            <div>
              <label htmlFor='dob'>Date of Birth</label>
              <Field type='date' name='dob' className={touched.dob && errors.dob ? 'error' : ''} />
              {/* <ErrorMessage name='dob' component='div' className='error-message' /> */}
            </div>
            <div>
              <label htmlFor='address_line1'>Address Line 1</label>
              <Field type='text' name='address_line1' className={touched.address_line1 && errors.address_line1 ? 'error' : ''} />
              {/* <ErrorMessage name='address_line1' component='div' className='error-message' /> */}
            </div>
            <div>
              <label htmlFor='address_line2'>Address Line 2</label>
              <Field type='text' name='address_line2' className={touched.address_line2 && errors.address_line2 ? 'error' : ''} />
              {/* <ErrorMessage name='address_line2' component='div' className='error-message' /> */}
            </div>
            <div>
              <label htmlFor='pincode'>Pincode</label>
              <Field type='text' name='pincode' className={touched.pincode && errors.pincode ? 'error' : ''} />
              {/* <ErrorMessage name='pincode' component='div' className='error-message' /> */}
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <Field type={showPassword ? 'text' : 'password'} name='password' className={touched.password && errors.password ? 'error' : ''} />
              <span className='toggle-password' onClick={togglePasswordVisibility}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              <ErrorMessage name='password' component='div' className='error-message' />
            </div>
            <div>
              <label htmlFor='confpass'>Confirm Password</label>
              <Field type={showConfPassword ? 'text' : 'password'} name='confpass' className={touched.confpass && errors.confpass ? 'error' : ''} />
              <span className='toggle-password' onClick={toggleConfPasswordVisibility}>
                {showConfPassword ? <FiEyeOff /> : <FiEye />}
              </span>
              <ErrorMessage name='confpass' component='div' className='error-message' />
            </div>
            <div className='button-container'>
              <button className='submit' type='submit' disabled={isSubmitting}>
                Sign-up
              </button>
              <button className='register' type='button' onClick={handleSigninClick}>
                Sign-in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
