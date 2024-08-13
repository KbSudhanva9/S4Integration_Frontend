import './ASNVendor.css'
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../../../Utils/ApiCalls/Api';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MenuItem, Select, TextField } from '@mui/material';


// const SigninSchema = Yup.object().shape({
//     vid: Yup.string('Invalid Vendor ID').required('Required'),
//     password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
// });

const ASNVendorHome = () => {

    const { token, user } = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [poList, setPOList] = useState([]);


    const handleGetData = async (url) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(statusSearchURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('poList')) {
                setPOList(response.data.data.results);
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handlePODataLineItemsData = () => {
        var url = '/sap/asn/poList';
        handleGetData(url);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(value);
        // console.log(name);
        if (name === 'PoNo') {
            console.log(value);
            // handlePOdetailsAndLineItems(value);
        }
    }

    useEffect(() => {
        handlePODataLineItemsData();
    }, []);
    //   const handleVendorLogin = async (values) => {
    //     var loginurl = `${import.meta.env.VITE_BASE_URL}` + '/sap/login';
    //     try {
    //       const response = await api.post(loginurl,
    //         {
    //           "username": `${values.vid}`,
    //           "password": `${values.password}`
    //         }
    //       );
    //       // console.log(response.data.user);
    //       // localStorage.setItem('token', response.data.user.accessToken);

    //       dispatch(setAuth({
    //         token: response.data.user.accessToken,
    //         user: response.data.user.Username
    //       }));

    //       navigate('/asn-vendor/home');
    //     } catch (error) {
    //       console.error('Login failed', error);
    //     }
    //   };

    const Schema = Yup.object().shape({
        // vid: Yup.string('Invalid Vendor ID').required('Required'),
        // password: Yup.string().min(6, 'Too Short!').max(50, 'Too Long!').required('Required'),
        ponumber: Yup.string().required(),
    });

    // const handleSignInClick = () => {
    //     navigate('/');
    // };

    // useEffect(() => {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     navigate('/home');
    //   }
    // }, [navigate]);

    return (
        <div className='sign-in-div' style={{ marginTop: '-40px' }}>
            {/* <div className='maincomponent' style={{ padding: '20px 20px 20px 20px', borderRadius: '8px' }}> */}

            {/* <div>
                    <p><b>Purchase Order Number</b></p>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        fullWidth
                        name="PoNo"
                        style={{ width: '200px' }}
                        onChange={handleChange}
                    >
                        {poList.map((option) => (
                            <MenuItem key={option.po_no} value={option.po_no}>
                                {option.po_no}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <center>
                    <Button style={{ margin: '20px' }} variant='contained' color='error' size='small'>Submit</Button>
                </center> */}


            <Formik
                initialValues={{
                    ponumber: '',
                }}
                validationSchema={Schema}
                onSubmit={(values) => {
                    // Handle form submission
                    console.log(values);

                    // handleVendorLogin(values);
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue }) => (
                    <Form >
                        <div>
                            <p>Supplier</p>
                            <TextField id="outlined-basic" fullWidth disabled value={user} variant="outlined" size='small' />
                        </div>
                        <div>
                            <p htmlFor="vid">PO Number</p>
                            {/* <Field type="string" name="vid" className={touched.vid && errors.vid ? 'error' : ''} /> */}
                            <Field
                                as={Select}
                                id="ponumber"
                                name="ponumber"
                                size='small'
                                fullWidth
                                // style={{ width: '188px' }}
                                error={touched.ponumber && !!errors.ponumber}
                                onChange={(event) => {
                                    const selectedValue = event.target.value;
                                    // console.log(selectedValue);
                                    setFieldValue('ponumber', selectedValue);
                                    // if (!selectedValue) { }
                                    // else {
                                    //     handleCurrency(selectedValue);
                                    //     handleRegion(selectedValue);
                                    //     handleTermOfPaymnets(selectedValue);
                                    //     handleBankName(selectedValue);
                                    // }
                                }}
                            >
                                {poList.map((option) => (
                                    <MenuItem key={option.po_no} value={option.po_no}>
                                        {option.po_no}
                                    </MenuItem>
                                ))}
                            </Field>
                            <ErrorMessage name="vid" component="div" className="error-message" />
                        </div>
                        <center>
                            <div>
                                <Button variant="contained" size='small' color='error' className='submit' type='submit' style={{ margin: '20px' }} >
                                    Submit
                                </Button>
                            </div>

                            <NavLink to='/asn-vendor/track-status'>Track ASN Status</NavLink>
                        </center>
                    </Form>

                )}
            </Formik>



            {/* <center>
                <NavLink >Track ASN Status</NavLink>
            </center> */}
            {/* </div> */}

        </div>
    );
};

export default ASNVendorHome;
