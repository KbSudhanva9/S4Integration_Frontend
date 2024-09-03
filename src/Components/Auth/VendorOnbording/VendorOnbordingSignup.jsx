import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from '@mui/material';
import * as Yup from 'yup';
import { FiSave } from "react-icons/fi";
import api from '../../../Utils/ApiCalls/Api'

// import { TextField } from '@mui/material';
import './VendorOnbording.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IoPowerOutline } from 'react-icons/io5';

const VendorOnbordingSignup = () => {

    const nav = useNavigate();

    const title = [
        { value: 'Mr', label: 'Mr', },
        { value: 'Mrs', label: 'Mrs', },
        { value: 'Ms', label: 'Ms', },
        { value: 'Dr', label: 'Dr', }
    ];

    useEffect(() => {
        handleCountryCode();
        handleIndestry();
    }, [])

    const [country, setCountry] = useState([]);
    const [industrySet, setIndustrySet] = useState([]);
    const [region, setRegion] = useState([]);
    const [terms, setTerms] = useState([]);
    const [bankName, setBankName] = useState([]);
    const [currency, setCurrency] = useState("");

    const [openSubmit, setOpenSubmit] = useState(false);
    const [successMessage, setSuccessMessage] = useState([]);
    const [refNo, setRefNo] = useState([]);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    // const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleCloseErrorDiolog = () => {
        setOpenError(false);
    };
    const handleCloseSubmitDiolog = () => {
        nav(-1);
        setOpenSubmit(false);
    };
    
    const copyRefNo = () => {
        // const ids = sRows.map(item => `${item.id}`).join(', ');
        const copyRefNo = refNo;
        navigator.clipboard.writeText(copyRefNo).then(() => {
            console.log('Copied to clipboard:', copyRefNo);
            // setSnackbarOpen(true);
            nav(-1);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    // const handleSnackbarClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setSnackbarOpen(false);
    // };

    const getCalling = async (url) => {
        setCurrency('');
        // var currentURL = `${import.meta.env.VITE_CROSS_ORIGIN_URL}${import.meta.env.VITE_VENDOR_ONBORDING_BASE_URL}` + url;
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL);
            if (url.includes('countrySet')) {
                // console.log(response.data.data.results);
                setCountry(response.data.data.results);
                // setCountry(response.data.d.results);
            }
            else if (url.includes('industries')) {
                setIndustrySet(response.data.data.results);
            }
            // else if(url.includes('CurrencySet')){
            //     setCurrency(response.data.d.Waers);

            // }
        } catch (error) {
            console.error('unable to get the response', error);
        }
    };

    const postCalling = async (url, body) => {
        setCurrency('');
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(currentURL, body);
            if (url.includes('currency')) {
                setCurrency(response.data.data.Waers);
            } else if (url.includes('regionSet')) {
                setRegion(response.data.data.results);
            } else if (url.includes('venTermOfPaymnets')) {
                setTerms(response.data.data.results);
            } else if (url.includes('bankName')) {
                // console.log(response.data.data.results);
                setBankName(response.data.data.results);
            } else if(url.includes('createVen')){
                console.log(response);
                console.log(response.data.data.TempVend);
                console.log(response.data.data.Message);
                setOpenSubmit(true);
                setRefNo(response.data.data.TempVend);
                setSuccessMessage(response.data.data.Message);
            }
        } catch (error) {
            console.error('unable to get the response', error);
            if (url.includes('createVen')) {
                // setErrorMessage(response.data);
                var ee = error.response.data.message;
                // console.log(error.response.data);
                // console.log(error.response.data.message);
                setErrorMessage(ee);
                // setErrorMessage(response.data.message);
                setOpenError(true);
            }
        }
    };

    const handleCountryCode = () => {
        const url = '/sap/countrySet';
        getCalling(url);
    };
    const handleIndestry = () => {
        const url = '/sap/industries';
        getCalling(url);
    };
    const handleCurrency = (cCode) => {
        const url = '/sap/currency';
        const body = {
            "currencyCode": `${cCode}`
        }
        postCalling(url, body);
    }
    const handleRegion = (cCode) => {
        const url = '/sap/regionSet';
        const body = {
            "countryCode": `${cCode}`
        }
        postCalling(url, body);
    }
    const handleTermOfPaymnets = (cCode) => {
        const url = '/sap/venTermOfPaymnets';
        const body = {
            "countryCode": `${cCode}`
        }
        postCalling(url, body);
    }
    const handleBankName = (cCode) => {
        const url = '/sap/bankName';
        const body = {
            "countryCode": `${cCode}`
        }
        postCalling(url, body);
    }
    const handleCreateVendor = (postBody) => {
        const url = '/sap/createVen';
        const body = postBody;
        postCalling(url, body);
    }

    const validationSchema = Yup.object().shape({
        Anred: Yup.string().required('Required'),
        Name1: Yup.string().required('Required'),
        SmtpAddr: Yup.string().email().required('Required'),
        Stras: Yup.string().required('Required'),
        Pstlz: Yup.string().matches(/^[0-9]{6}$/, 'Invalid pincode').required('Required'),
        Land1: Yup.string().required('Required'),
        Regio: Yup.string().required('Required'),
        Telf1: Yup.string().matches(/^[6-9]{1}[0-9]{9}$/, 'Invalid phone number').required('Required'),
        Brsch: Yup.string().required('Required'),
        TaxNumber: Yup.string().min(11).required('Required'),
        Bankl: Yup.string().required('Required'),
        Bankn: Yup.string().required('Required'),
        Ifsc: Yup.string().required('Required'),
        // Waers: Yup.string().required('Required'),
        PaymentTerms: Yup.string().required('Required')
    });

    return (
        <div>
            <header>
                <img
                    style={{ padding: "10px 0px 10px 20px", width: '185px', height: '30px' }}
                    src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
                />

                <p style={{ marginRight: '11%' }}><b >Vendor OnBording</b></p>

                <Button onClick={() => { nav('/vendor-onbording-login') }} style={{ fontSize: '20px', height: '70%', marginTop: '8px', marginRight: '10px' }} size='small' color='error' ><IoPowerOutline /></Button>

            </header>
            <div className='maincomponent'>
                {/* <Button onClick={() => { console.log(currency) }}>sadfsafd</Button> */}
                {/* <div > */}
                <Formik
                    initialValues={{
                        "TempVend": "",
                        "Telf1": '',    //phone no
                        "Anred": '',    //title--->drop down
                        "Land1": '',    //contry--->drop down
                        "Name1": '',    //name1
                        "Name2": '',    //name2
                        "Name3": '',    //name3
                        "Name4": '',    //name4
                        "Ort01": '',    //postal code
                        "Ort02": "",
                        "Pfach": '',    //postal code
                        "Pstl2": '',    //street/house no
                        "Pstlz": '',    //postal code(main)
                        "Regio": '',    //region--->drop down
                        "Sortl": "",
                        "Stras": '',    //street/house no
                        "Adrnr": "",
                        "Mcod1": "",
                        "Mcod2": "",
                        "Mcod3": "",
                        "Brsch": '',    //indestry type--->drop down
                        "Verkf": '',    //contact person
                        "SmtpAddr": '', //email
                        "Telfx": '',    //fax
                        "Bankl": '',    //bank name--->drop down
                        "Bankn": '',    //bank account no--->number
                        "Waers": '', //currency,    //order currency--->drop down
                        "Minbw": '0.00',    //min order value
                        "Message": "",
                        "Ifsc": "",     //ifsccode
                        "PaymentTerms": "", //payment terms
                        "TaxNumber": "", //tax no
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        // const { confpass, ...rest } = values;
                        values.Ort01 = values.Pstlz;
                        values.Pfach = values.Pstlz;
                        values.Waers = currency;
                        values.Pstl2 = values.Pstlz;
                        console.log(values);
                        // console.log(currency);
                        handleCreateVendor(values);
                    }}
                >
                    {({ errors, touched, isSubmitting, setFieldValue }) => (
                        <Form style={{ boxShadow: '0 0 0px rgba(0, 0, 0, 0)', padding: '0px', maxWidth: '250px' }}>
                            <b>User Details</b>
                            <div className='maincomponent'>
                                <div className='side-by-side'>
                                    <div className='child'>
                                        <label htmlFor='Anred'>Title <span style={{ color: 'red' }}>*</span></label>
                                        <Field
                                            as={Select}
                                            id="Anred"
                                            name="Anred"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.Anred && !!errors.Anred}
                                        >
                                            {title.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {/* <ErrorMessage name="Anred" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Name1">Name1 <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Name1" className={touched.Name1 && errors.Name1 ? 'error' : ''} />
                                        {/* <ErrorMessage name="Name1" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child' >
                                        <label htmlFor="Name2">Name2</label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Name2" className={touched.Name2 && errors.Name2 ? 'error' : ''} />
                                        {/* <ErrorMessage name="Name2" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child' >
                                        <label htmlFor="Name3">Name3</label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Name3" className={touched.Name3 && errors.Name3 ? 'error' : ''} />
                                        {/* <ErrorMessage name="Name3" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child' >
                                        <label htmlFor="Name4">Name4</label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Name4" className={touched.Name4 && errors.Name4 ? 'error' : ''} />
                                        {/* <ErrorMessage name="Name4" component="div" className="error-message" /> */}
                                    </div>

                                </div>
                                <div className='side-by-side'>
                                    <div className='child'>
                                        <label htmlFor="Verkf">Contact Person</label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Verkf" className={touched.Verkf && errors.Verkf ? 'error' : ''} />
                                        {/* <ErrorMessage name="Verkf" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="SmtpAddr">Email <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="email" name="SmtpAddr" className={touched.SmtpAddr && errors.SmtpAddr ? 'error' : ''} />
                                        {/* <ErrorMessage name="SmtpAddr" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Stras">Street/House no <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Stras" className={touched.Stras && errors.Stras ? 'error' : ''} />
                                        {/* <ErrorMessage name="Stras" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Pstlz">Postal Code/City <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Pstlz" className={touched.Pstlz && errors.Pstlz ? 'error' : ''} />
                                        {/* <ErrorMessage name="Pstlz" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor='Land1'>Contry <span style={{ color: 'red' }}>*</span></label>
                                        <Field
                                            as={Select}
                                            id="Land1"
                                            name="Land1"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.Land1 && !!errors.Land1}
                                            onChange={(event) => {
                                                const selectedValue = event.target.value;
                                                setFieldValue('Land1', selectedValue);
                                                if (!selectedValue) { }
                                                else {
                                                    handleCurrency(selectedValue);
                                                    handleRegion(selectedValue);
                                                    handleTermOfPaymnets(selectedValue);
                                                    handleBankName(selectedValue);
                                                }
                                            }}
                                        >
                                            {country.map((option) => (
                                                <MenuItem key={option.Land1} value={option.Land1}>
                                                    {option.Landx} ({option.Land1})
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {/* <ErrorMessage name="Land1" component="div" className="error-message" /> */}
                                    </div>
                                </div>
                                <div className='side-by-side'>
                                    <div className='child'>
                                        <label htmlFor='Regio'>Region <span style={{ color: 'red' }}>*</span></label>
                                        <Field
                                            as={Select}
                                            id="Regio"
                                            name="Regio"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.Regio && !!errors.Regio}
                                        >
                                            {region.map((option) => (
                                                <MenuItem key={option.Bland} value={option.Bland}>
                                                    {option.Bezei} ({option.Bland})
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {/* <ErrorMessage name="Regio" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Telf1">Phone no <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Telf1" className={touched.Telf1 && errors.Telf1 ? 'error' : ''} />
                                        {/* <ErrorMessage name="Telf1" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Telfx">Fax </label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Telfx" className={touched.Telfx && errors.Telfx ? 'error' : ''} />
                                        {/* <ErrorMessage name="Telfx" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor='Brsch'>Industry Type <span style={{ color: 'red' }}>*</span></label>
                                        <Field
                                            as={Select}
                                            id="Brsch"
                                            name="Brsch"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.Brsch && !!errors.Brsch}
                                        >
                                            {industrySet.map((option) => (
                                                <MenuItem key={option.Brsch} value={option.Brsch}>
                                                    {option.Brtxt} ({option.Brsch})
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {/* <ErrorMessage name="Brsch" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="TaxNumber">Tax Number <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="TaxNumber" className={touched.TaxNumber && errors.TaxNumber ? 'error' : ''} />
                                        {/* <ErrorMessage name="TaxNumber" component="div" className="error-message" /> */}
                                    </div>
                                </div>
                            </div>
                            <b>Bsnk Details</b>
                            <div className='maincomponent'>
                                <div className='side-by-side'>
                                    <div className='child'>
                                        <label htmlFor='Bankl'>Bank Name <span style={{ color: 'red' }}>*</span></label>
                                        <Field
                                            as={Select}
                                            id="Bankl"
                                            name="Bankl"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.Bankl && !!errors.Bankl}
                                        >
                                            {bankName.map((option) => (
                                                <MenuItem key={option.Bankname} value={option.Bankname}>
                                                    {option.Description} ({option.Bankname})
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {/* <ErrorMessage name="Bankl" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Bankn">Bank Account Number <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Bankn" className={touched.Bankn && errors.Bankn ? 'error' : ''} />
                                        {/* <ErrorMessage name="Bankn" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child' >
                                        <label htmlFor="Ifsc">IFSC Code <span style={{ color: 'red' }}>*</span></label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Ifsc" className={touched.Ifsc && errors.Ifsc ? 'error' : ''} />
                                        {/* <ErrorMessage name="Ifsc" component="div" className="error-message" /> */}
                                    </div>
                                </div>
                                <div className='side-by-side'>
                                    <div className='child'>
                                        <label htmlFor='Waers'>Ordered Currency <span style={{ color: 'red' }}>*</span></label>
                                        {/* <Field
                                            as={Select}
                                            id="Waers"
                                            name="Waers"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.Waers && !!errors.Waers}
                                        >
                                            {title.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Field> */}
                                        <Field style={{ width: '188px' }} disabled value={currency} size='small' type="text" name="Waers" className={touched.Waers && errors.Waers ? 'error' : ''} />
                                        {/* value={currency}  onChange={handleCurrencyChange}*/}
                                        {/* <ErrorMessage name="Waers" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child'>
                                        <label htmlFor="Minbw">Minimum Order Value </label>
                                        <Field style={{ width: '188px' }} size='small' type="text" name="Minbw" className={touched.Minbw && errors.Minbw ? 'error' : ''} />
                                        {/* <ErrorMessage name="Minbw" component="div" className="error-message" /> */}
                                    </div>
                                    <div className='child' >
                                        <label htmlFor="PaymentTerms">Payment Terms <span style={{ color: 'red' }}>*</span></label>
                                        <Field
                                            as={Select}
                                            id="PaymentTerms"
                                            name="PaymentTerms"
                                            size='small'
                                            style={{ width: '188px' }}
                                            error={touched.PaymentTerms && !!errors.PaymentTerms}
                                        >
                                            {terms.map((option) => (
                                                <MenuItem key={option.TermsOfPayment} value={option.TermsOfPayment}>
                                                    {option.TermsOfPayment}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                        {/* <ErrorMessage name="PaymentTerms" component="div" className="error-message" /> */}
                                    </div>
                                </div>
                            </div>
                            <Button startIcon={<FiSave />} variant="contained" size='small' color='error' className='submit' type='submit' >
                                Create
                            </Button>
                        </Form>
                    )}
                </Formik>
                {/* </div> */}
            </div>

            <Dialog fullWidth={true} maxWidth={'xs'} open={openSubmit} onClose={handleCloseSubmitDiolog}>
                <DialogTitle>Confirm to Submit</DialogTitle>
                <DialogContent dividers>
                    <p>{successMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSubmitDiolog} variant='outlined' >
                        Close
                    </Button>
                    <Button onClick={copyRefNo} variant='outlined' color="warning">
                        Copy
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth={true} maxWidth={'xs'} open={openError} onClose={handleCloseErrorDiolog}>
                <DialogTitle>Please enter all mandetry Details</DialogTitle>
                <DialogContent dividers>
                    <p>{errorMessage}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseErrorDiolog} color="error">
                        Cancel
                    </Button>
                    {/* <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default VendorOnbordingSignup;