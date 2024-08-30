import './ASNVendor.css'
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../../../Utils/ApiCalls/Api';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, MenuItem, Select, TextField } from '@mui/material';


const ASNVendorHome = () => {

    const { token, user } = useSelector((state) => state.auth);
    const { po, setPO } = useOutletContext();
    const [loading, setLoading] = useState(true);

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
                setLoading(false);
            }
        } catch (error) {
            console.log('Search failed', error);
            setLoading(false);
        }
    };

    const handlePODataLineItemsData = () => {
        setLoading(true);
        var url = '/sap/asn/poList';
        handleGetData(url);
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     if (name === 'PoNo') {
    //         console.log(value);
    //     }
    // }

    useEffect(() => {
        handlePODataLineItemsData();
        setPO("");
    }, []);
    const Schema = Yup.object().shape({
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

            {loading ? (
                <div style={{
                    width: '100%',
                    height: '100%',
                    // backgroundColor: '#ccc',
                    paddingTop: '35vh',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1100
                }}>
                    <CircularProgress style={{ color: '#ea1214' }} />
                </div>
            ) : (

                <Formik
                    initialValues={{
                        ponumber: '',
                    }}
                    validationSchema={Schema}
                    onSubmit={(values) => {
                        // console.log(values);
                        navigate('/asn-vendor/asn-details');
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
                                <Field
                                    as={Select}
                                    id="ponumber"
                                    name="ponumber"
                                    size='small'
                                    fullWidth
                                    value={po}
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

                                        setPO(event.target.value)
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
            )}
        </div>
    );
};

export default ASNVendorHome;
