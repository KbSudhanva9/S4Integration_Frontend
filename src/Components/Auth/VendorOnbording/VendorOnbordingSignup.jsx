import Button from '@mui/material/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './VendorOnbording.css'

const VendorOnbordingSignup = () => {
    return ( 
        <div>
            <header>
                <img
                    style={{ padding: "10px 0px 10px 20px", width: '185px', height: '30px' }}
                    src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
                />

                <p style={{marginRight: '11%'}}><b >Vendor OnBording</b></p>

                <Button style={{margin : '10px'}} variant="contained" size='small' color='error' >Login</Button>

            </header>
            <div className='maincomponent'>
                <b>User Details</b>
                <div className='maincomponent'>
                <Formik
                    initialValues={{
                    title: '',
                    name1: '',
                    name2: '',
                    name3: '',
                    name4: '',
                    contact_person: '',
                    email: '',
                    street: '',
                    }}
                    // validationSchema={SignupSchema}
                    onSubmit={(values) => {
                    // const { confpass, ...rest } = values;
                    console.log(values);
                    // handleSignUpClick(values);
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                    <Form style={{boxShadow : '0 0 0px rgba(0, 0, 0, 0)', padding: '0px', maxWidth: '250px'}}>
                        <div>
                            <label htmlFor='firstName'>Title</label>
                            <Field type='text' name='firstName' className={touched.firstName && errors.firstName ? 'error' : ''} />
                            {/* <ErrorMessage name='firstName' component='div' className='error-message' /> */}
                        </div>
                    </Form>
                    )}
                </Formik>
                </div>
            </div>
        </div>
     );
}
 
export default VendorOnbordingSignup;