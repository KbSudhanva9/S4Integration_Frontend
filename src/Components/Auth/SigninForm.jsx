import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Sign.css';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Assuming you are using react-icons for eye icons

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const SigninForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSignUpClick = () => {
    navigate('/sign-up');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <p className='title'>Signin</p>
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
              <button className='register' type="button" onClick={handleSignUpClick}>
                Sign-up
              </button>
              <button className='submit' type="submit" disabled={isSubmitting}>
                Sign-in
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SigninForm;
