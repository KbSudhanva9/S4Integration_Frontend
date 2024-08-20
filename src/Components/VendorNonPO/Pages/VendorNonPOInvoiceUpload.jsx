import { Button, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../Utils/ApiCalls/Api";

const VendorNonPOInvoiceUpload = () => {

    const email = localStorage.getItem('email');
    const { token, user } = useSelector((state) => state.auth);

    const [companyCode, setCompanyCode] = useState([]);
    const [bussinessPlace, setBussinessPlace] = useState([]);
    const [cCenter, setcCenter] = useState([]);
    const [glAcc, setglAcc] = useState([]);

    const [invdate, setinvdate] = useState('');

    const [verifyData, setVerifyData] = useState({
        "RefNum": "",
        "VenMail": email,
        "InvNum": "",
        "InvDate": "",
        "CompCode": "1710",
        "CostCenter": "0017100300",
        "GlAcc": "0065150000",
        "BussPlace": "",
        "BookConfNum": "",
        "TotalAmt": "4500.00",
        "Currency": "USD",
        "PdfName": "3000042393.pdf",
        "nonpoLineItemsValidationSet": {
            "results": [
                // {
                //     "VenNum": "0017300002",
                //     "Description": "Keyboards",
                //     "RefNum": "",
                //     "LineitemNum": "",
                //     "Uom": "D",
                //     "Quantity": "5",
                //     "TaxableAmt": "900",
                //     "TaxCode": "I0",
                //     "TaxcodeDes": "Requested Keybordes",
                //     "HsnSacCode": "",
                //     "Remarks": "hiiiii"
                // }
            ]
        }
    });

    const handleGetData = async (url) => {
        const currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('compCode')) {
                setCompanyCode(response.data.data.results);
            } else if (url.includes('dashboardGraph')) {
                console.log(response.data.data);
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handlePostData = async (url, body) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(currentURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // console.log(response);
            if (url.includes('bpValues')) {
                setBussinessPlace(response.data.data.businessPlacesSet.results);
            } else if (url.includes('costCenter')) {
                setcCenter(response.data.data.results);
            } else if (url.includes('glAcc')) {
                setglAcc(response.data.data.results);
                // console.log(response.data.data.results);
            }//else if(url.includes('bankName')){
            //     // console.log(response.data.data.results);
            //     setBankName(response.data.data.results);
            // }
        } catch (error) {
            console.error('unable to get the response', error);
        }
    };

    const handleCompanyCodeData = () => {
        var url = '/sap/nonpo/compCode';
        handleGetData(url);
    }

    const handleBussinessPlace = (bpValues) => {
        const url = '/sap/nonpo/bpValues';
        const body = {
            "companyCode": `${bpValues}`
        }
        handlePostData(url, body);
    }
    const handleCostCenter = (ccValues) => {
        const url = '/sap/nonpo/costCenter';
        const body = {
            "companyCode": `${ccValues}`
        }
        handlePostData(url, body);
    }
    const handleGLac = (glAcc) => {
        const url = '/sap/nonpo/glAcc';
        const body = {
            "companyCode": `${glAcc}`
        }
        handlePostData(url, body);
    }

    useEffect(() => {
        handleCompanyCodeData();
    }, [])

    useEffect(() => {
        setVerifyData((prevData) => ({
          ...prevData,
          InvDate: invdate.replaceAll("-", ""),
        }));
      }, [invdate]);

    return (

        <div>
            <div className="maincomponent">
                <label><b>Vendor Details</b></label>
                <div style={{padding: '10px'}}>
                    <div className="df" style={{margin: '0px 0px 15px 0px'}}>
                        <div>
                            <label>Vendor No : </label>
                            <TextField size="small" value={user} disabled style={{ width: '188px', margin: '-8px 50px 0px 50px' }}></TextField>
                        </div>
                        <div>
                            <label>Invoice Date : </label>
                            <TextField size="small" value={invdate} onChange={(e)=>{setinvdate(e.target.value)}} style={{ width: '188px', margin: '-8px 5px 0px 50px' }} type="date"  ></TextField>
                        </div>
                    </div>
                    <div className="df" style={{margin: '15px 0px'}}>
                        <div>
                            <label>Email-id : </label>
                            <TextField size="small" value={email} disabled style={{ width: '188px', margin: '-8px 50px 0px 68px' }} type="email"></TextField>
                        </div>
                        <div>
                            <label>Invoice Number : </label>
                            <TextField size="small" value={verifyData.InvNum} onChange={(e)=>{setVerifyData(prev =>({...prev, InvNum: e.target.value}))}} style={{ width: '188px', margin: '-8px 5px 0px 27px' }}></TextField>
                        </div>
                    </div>
                    <div className="df" style={{margin: '15px 0px'}}>
                        <div >
                            <label>Upload Invoice : </label>
                            <TextField size="small" style={{margin: '-8px 5px 0px 20px'}} type="file"></TextField>
                        </div>
                    </div>
                    <div className="df" style={{margin: '15px 0px 0px 0px'}}>
                        <div>
                            <label>Digital Signature : </label>
                            <label></label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="maincomponent">
                <label><b>Company Details</b></label>
                <div style={{padding: '10px'}}>
                    <div className="df" style={{margin: '0px 0px 15px 0px'}}>
                        <div>
                            <label>Company Code : </label>
                            <TextField
                                id="CompCode"
                                select
                                size='small'
                                style={{ width: '188px', margin: '-8px 48px 0px 10px' }}
                                onChange={(event) => {
                                    const selectedValue = event.target.value;
                                    // setFieldValue('Land1', selectedValue);
                                    if (!selectedValue) { }
                                    else {
                                        handleBussinessPlace(selectedValue);
                                        handleCostCenter(selectedValue);
                                        handleGLac(selectedValue);
                                        // handleCurrency(selectedValue);
                                        // handleRegion(selectedValue);
                                        // handleTermOfPaymnets(selectedValue);
                                        // handleBankName(selectedValue);
                                    }
                                }}
                            >
                                {companyCode.length > 0 ? (
                                    companyCode.map((option) => (
                                        <MenuItem key={option.companyCode} value={option.companyCode}>
                                            {option.companyCode} ({option.description})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div>
                            <label>Bussiness Place : </label>
                            <TextField
                                id="BussPlace"
                                select
                                size='small'
                                style={{ width: '188px', margin: '-8px 5px 0px 90px' }}
                            >
                                {bussinessPlace.length > 0 ? (
                                    cCenter.map((option) => (
                                        <MenuItem key={option.businessPlace} value={option.businessPlace}>
                                            {option.businessPlace} ({option.description})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                    </div>
                    <div className="df" style={{margin: '15px 0px'}}>
                        <div>
                            <label>Cost Center : </label>
                            <TextField
                                id="CostCenter"
                                select
                                size='small'
                                style={{ width: '188px', margin: '-8px 48px 0px 36px' }}
                            >
                                {cCenter.length > 0 ? (
                                    cCenter.map((option) => (
                                        <MenuItem key={option.costCenter} value={option.costCenter}>
                                            {option.costCenter} ({option.description})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div>
                            <label>Booking Confiramation No : </label>
                            <TextField
                                id="BookConfNum"
                                size='small'
                                style={{ width: '188px', margin: '-8px 5px 0px 20px' }}
                            >
                            </TextField>
                        </div>
                    </div>
                    <div className="df" style={{margin: '15px 0px 0px 0px'}}>
                        <div>
                            <label>GL Account : </label>
                            <TextField
                                id="GlAcc"
                                select
                                size='small'
                                style={{ width: '188px', margin: '-8px 5px 0px 40px' }}
                            >
                                {glAcc.length > 0 ? (
                                    glAcc.map((option) => (
                                        <MenuItem key={option.glAccount} value={option.glAccount}>
                                            {option.glAccount} ({option.glDescription})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                    </div>
                </div>
            </div>
            <div className="maincomponent">

            </div>

            <div className="maincomponent">
                <Button onClick={()=>{console.log(verifyData)}}>Submit</Button>
            </div>
        </div>
    );
}

export default VendorNonPOInvoiceUpload;