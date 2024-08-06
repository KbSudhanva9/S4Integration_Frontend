import Button from '@mui/material/Button';
import './Vendor.css'
import { useNavigate } from 'react-router-dom';
import api from '../../Utils/ApiCalls/Api';
import { useEffect, useState } from 'react';

const VendorOnbording = () => {

    const nav = useNavigate();

    const [vdata, setVData] = useState([]);

    useEffect(()=>{
        handleStatusSearch();
    }, []);

    const handleStatusSearch = async () => {
        
        // const statusSearchURL = `${import.meta.env.VITE_CROSS_ORIGIN_URL}${import.meta.env.VITE_VENDOR_ONBORDING_BASE_URL}` + `VendorSet('YASWAN141')`;
        // `VendorSet('${refNo}')`;
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + '/sap/venDetails';

        try {
            const response = await api.get(statusSearchURL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                    // 'Content-Type': 'application/json',
                    // 'Accept': 'application/json',
                    // 'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_SAP_USER_NAME}:${import.meta.env.VITE_SAP_PASSWORD}`),
                    // 'X-Requested-With': 'XMLHttpRequest'
                }
            });
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.data);
            setVData(response.data.data);

        } catch (error) {
            console.log('Search failed', error);
        }
        console.log(vdata);
    };

    return (
        <div>
             <header>
                <img
                    style={{ padding: "10px 0px 10px 20px", width: '185px', height: '30px' }}
                    src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
                />

                <p style={{marginRight: '11%'}}><b >Vendor Details</b></p>

                <Button onClick={()=>{nav('/vendor-onbording-login'); localStorage.clear();}} style={{margin : '10px', backgroundColor: '#eb0101'}} variant="contained" size='small' color='error' >Login</Button>

            </header>
            <div className='maincomponent'>
                <b>User Details</b>
                <div >
                    <div className='df'>
                        <div className='box-margin'>
                            <p>Title</p>
                            <p className='display-input' >{vdata.Anred}</p>
                        </div>
                        <div className='box-margin'>
                            <p>Name1</p>
                            <p className='display-input' >{vdata.Name1}</p>
                        </div>
                        <div className='box-margin'>
                            <p>Name2</p>
                            <p className='display-input' >{vdata.Name2}</p>
                        </div>
                        <div className='box-margin'>
                            <p>Name3</p>
                            <p className='display-input' >{vdata.Name3}</p>
                        </div>
                        <div className='box-margin'>
                            <p>Name4</p>
                            <p className='display-input' >{vdata.Name4}</p>
                        </div>
                    </div>
                    <div className='df'>
                        <div className='box-margin'>
                            <p className='lable'>Contact Person</p>
                            <p className='display-input' >{vdata.Verkf}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Email</p>
                            <p className='display-input' >{vdata.SmtpAddr}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Street/House No</p>
                            <p className='display-input' >{vdata.Stras}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Postal Code/City</p>
                            <p className='display-input' >{vdata.Pstlz}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Country</p>
                            <p className='display-input' >{vdata.Land1}</p>
                        </div>
                    </div>
                    <div className='df'>
                        <div className='box-margin'>
                            <p className='lable'>Region</p>
                            <p className='display-input' >{vdata.Regio}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Phone No</p>
                            <p className='display-input' >{vdata.Telf1}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Fax</p>
                            <p className='display-input' >{vdata.Telfx}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Industry Type</p>
                            <p className='display-input' >{vdata.Brsch}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Tax Number</p>
                            <p className='display-input' >{vdata.TaxNumber}</p>
                        </div>
                    </div>
                </div>
                <b>Bank Details</b>
                <div >
                    <div className='df'>
                        <div className='box-margin'>
                            <p>Bank Name</p>
                            <p className='display-input' >{vdata.Bankl}</p>
                        </div>
                        <div className='box-margin'>
                            <p>Bank Account No</p>
                            <p className='display-input' >{vdata.Bankn}</p>
                        </div>
                        <div className='box-margin'>
                            <p>IFSC Code</p>
                            <p className='display-input' >{vdata.Ifsc}</p>
                        </div>
                    </div>
                    <div className='df'>
                        <div className='box-margin'>
                            <p className='lable'>Order Currency</p>
                            <p className='display-input' >{vdata.Waers}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Minimun Order Value</p>
                            <p className='display-input' >{vdata.Minbw}</p>
                        </div>
                        <div className='box-margin'>
                            <p className='lable'>Paymet Terms</p>
                            <p className='display-input' >{vdata.PaymentTerms}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Button onClick={handleStatusSearch}>get data</Button> */}
        </div>
    );
}

export default VendorOnbording;
