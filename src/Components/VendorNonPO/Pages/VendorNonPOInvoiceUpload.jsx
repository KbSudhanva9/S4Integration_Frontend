import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../Utils/ApiCalls/Api";
import { DataGrid } from "@mui/x-data-grid";
import { MdOutlineCopyAll, MdOutlineDeleteOutline, MdOutlinePostAdd } from "react-icons/md";
import Snackbar from '@mui/material/Snackbar';
import { GoUpload } from "react-icons/go";
import { TbNotesOff } from "react-icons/tb";

const VendorNonPOInvoiceUpload = () => {

    const email = localStorage.getItem('email');
    const { token, user } = useSelector((state) => state.auth);

    const [companyCode, setCompanyCode] = useState([]);
    const [bussinessPlace, setBussinessPlace] = useState([]);
    const [cCenter, setcCenter] = useState([]);
    const [glAcc, setglAcc] = useState([]);
    const [uom, setUOM] = useState([]);
    const [taxCode, setTaxCode] = useState([]);
    const [hsn, setHSN] = useState([]);
    const [currency, setCurrency] = useState([]);

    const [lineItems, setLineItems] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [invdate, setinvdate] = useState('');
    const [pdfna, setpdfna] = useState('');

    const [openSubmit, setOpenSubmit] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sideLoading, setSideLoading] = useState(false);
    

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };



    const [verifyData, setVerifyData] = useState({
        "RefNum": "",
        "VenMail": email,
        "InvNum": "",
        "InvDate": "",
        "CompCode": "",
        "CostCenter": "",
        "GlAcc": "",
        "BussPlace": "",
        "BookConfNum": "",
        "TotalAmt": "",
        "Currency": "",
        "PdfName": "",
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

    const handleClearAll = () => {
        handleDeleteAll();
        setinvdate('');
        setVerifyData({
            "RefNum": "",
            "VenMail": email,
            "InvNum": "",
            "InvDate": "",
            "CompCode": "",
            "CostCenter": "",
            "GlAcc": "",
            "BussPlace": "",
            "BookConfNum": "",
            "TotalAmt": "",
            "Currency": "",
            "PdfName": "",
            "nonpoLineItemsValidationSet": {
                "results": []
            }
        });
    }

    const columns = [
        {
            field: 'Description',
            headerName: 'Description',
            width: 170,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'Uom',
            headerName: 'UOM',
            width: 110,
            renderCell: (params) => (
                <TextField
                    select
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                >
                    {uom.length > 0 ? (
                        uom.map((option) => (
                            <MenuItem key={option.UOM} value={option.UOM}>
                                {option.UOM} ({option.Description})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </TextField>
            ),
        },
        {
            field: 'Quantity',
            headerName: 'Qty',
            width: 90,
            renderCell: (params) => (
                <TextField
                    type="number"
                    value={params.value || ''}
                    onChange={(e) => {
                        handleCellChange(e, params);
                        calculateTotal(selectedRows); // Call calculateTotal after a change
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'TaxableAmt',
            headerName: 'Taxable Amount',
            width: 130,
            renderCell: (params) => (
                <TextField
                    type="number"
                    value={params.value || ''}
                    onChange={(e) => {
                        handleCellChange(e, params);
                        calculateTotal(selectedRows); // Call calculateTotal after a change
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'TaxCode',
            headerName: 'Tax Code',
            width: 120,
            renderCell: (params) => (
                <TextField
                    select
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                >
                    {taxCode.length > 0 ? (
                        taxCode.map((option) => (
                            <MenuItem key={option.TaxCode} value={option.TaxCode}>
                                {option.TaxCode} ({option.Description})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </TextField>
            ),
        },
        {
            field: 'TaxcodeDes',
            headerName: 'Tax Code Description',
            width: 170,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'HsnSacCode',
            headerName: 'HSN/SAC Code',
            width: 150,
            renderCell: (params) => (
                <TextField
                    select
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                >
                    {hsn.length > 0 ? (
                        hsn.map((option) => (
                            <MenuItem key={option.hsnsac_code} value={option.hsnsac_code}>
                                {option.hsnsac_code} ({option.Description})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </TextField>
            ),
        },
        {
            field: 'Remarks',
            headerName: 'Remarks',
            width: 170,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
    ];

    const handleAddRow = () => {
        const newRow = {
            id: lineItems.length + 1, // Ensure unique ID for each row
            VenNum: user,
            Description: "",
            Uom: "",
            Quantity: "",
            TaxableAmt: "",
            TaxCode: "",
            TaxcodeDes: "",
            HsnSacCode: "",
            Remarks: ""
        };
        setLineItems([...lineItems, newRow]);
    };

    const handleSelectionChange = (selection) => {
        const calcRowData = selection;
        const selectedRowsData = selection.map(id => lineItems.find(row => row.id === id));
        setSelectedRows(selectedRowsData);  // Update the selected rows state
        calculateTotal(calcRowData);   // Calculate the total based on the selected rows
    };

    const handleDeleteSelected = () => {
        setLineItems(prev => prev.filter(item => !selectedRows.includes(item.id)));
        setSelectedRows([]);
        // var hello = [prev => prev.filter(item => !selectedRows.includes(item.id))];
        console.log(lineItems);
        // console.log(selectedRows);

        // for(var i=0 ; i<=selectedRows.length-1 ; i++){
        //     // console.log(selectedRows[i].id);
        // }

        // console.log(hello);
        // setLineItems([]);
    };

    const handleDeleteAll = () => {
        setLineItems([]);  // Clear all items
        setSelectedRows([]);  // Also clear any selected rows, if applicable
    };

    const handleCellChange = (e, params) => {
        const updatedLineItems = [...lineItems];
        const index = updatedLineItems.findIndex(item => item.id === params.id);
        if (index !== -1) {
            updatedLineItems[index][params.field] = e.target.value;
            setLineItems(updatedLineItems);
        }
    };

    const calculateTotal = (selectedRowIds) => {
        const total = selectedRowIds.reduce((sum, id) => {
            const item = lineItems.find(row => row.id === id);
            const taxableAmount = parseFloat(item?.TaxableAmt || 0);
            const quantity = parseFloat(item?.Quantity || 0);
            return sum + (taxableAmount * quantity);
        }, 0);

        setVerifyData(prev => ({ ...prev, TotalAmt: total.toFixed(2) }));
    };

    const handleSubmit = () => {
        const cleanedLineItems = selectedRows.map(({ id, ...rest }) => rest);

        // Update the state with the cleaned line items
        setVerifyData(prev => {
            const updatedData = {
                ...prev,
                nonpoLineItemsValidationSet: { results: cleanedLineItems }
            };
            console.log(updatedData);

            handleVerifyData(updatedData);

            return updatedData;
        });
    };

    const handleCloseSubmitDiolog = () => {
        setOpenSubmit(false);
    };

    const handleCloseErrorDiolog = () => {
        setOpenError(false);
    };

    const handleMainPost = () => {
        const vdata = verifyData;
        const postdata = { ...vdata, nonpoPostingsNav: vdata.nonpoLineItemsValidationSet };
        delete postdata.nonpoLineItemsValidationSet;
        delete postdata.PdfName;

        console.log(postdata);

        const url = '/sap/nonpo/parking';
        const body = postdata;
        handlePostData(url, body);

        handleCloseSubmitDiolog();
        setSnackbarOpen(true);

        handleClearAll();
    }


    const handleGetData = async (url) => {
        const currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('compCode')) {
                setCompanyCode(response.data.data.results);
                setLoading(false);
            } else if (url.includes('uom')) {
                setUOM(response.data.data.results);
                setLoading(false);
            } else if (url.includes('currency')) {
                setCurrency(response.data.data.results);
                setLoading(false);
            }
        } catch (error) {
            console.log('Search failed', error);
            setLoading(false);
        }
    };

    const handlePostData = async (url, body) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(currentURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('bpValues')) {
                setBussinessPlace(response.data.data.businessPlacesSet.results);
                setSideLoading(false);
            } else if (url.includes('costCenter')) {
                setcCenter(response.data.data.results);
                setSideLoading(false);
            } else if (url.includes('defaultCurrency')) {
                setVerifyData(prev => ({ ...prev, Currency: response.data.data.currencyCode }));
                setSideLoading(false);
            } else if (url.includes('glAcc')) {
                setglAcc(response.data.data.results);
                setSideLoading(false);
            } else if (url.includes('taxCodes')) {
                setTaxCode(response.data.data.results);
                setSideLoading(false);
            } else if (url.includes('hsn')) {
                setHSN(response.data.data.hsnSacCodesSet.results);
                setSideLoading(false);
            } else if (url.includes('validation')) {
                console.log(response.data.message);
                setOpenSubmit(true);
            } else if (url.includes('parking')) {
                console.log(response);
            }

            // else if(!response.status === 200){
            // console.log(response);
            // }
        } catch (error) {
            console.error('unable to get the response', error);
            if (url.includes('validation')) {
                // setErrorMessage(response.data);
                var ee = error.response.data.message;
                // console.log(error.response.data);
                // console.log(error.response.data.message);
                setErrorMessage(ee);
                // setErrorMessage(response.data.message);
                setOpenError(true);
                setSideLoading(false);
            }
            setSideLoading(false);
        }
    };

    const handleCompanyCodeData = () => {
        setLoading(true);
        var url = '/sap/nonpo/compCode';
        handleGetData(url);
    }
    const handleUOM = () => {
        var url = '/sap/nonpo/uom';
        setLoading(true);
        handleGetData(url);
    }
    const handleCurrency = () => {
        setLoading(true);
        var url = '/sap/nonpo/currency';
        handleGetData(url);
    }


    const handleBussinessPlace = (companyCode) => {
        setSideLoading(true);
        const url = '/sap/nonpo/bpValues';
        const body = {
            "companyCode": `${companyCode}`
        }
        handlePostData(url, body);
    }
    const handleCostCenter = (companyCode) => {
        setSideLoading(true);
        const url = '/sap/nonpo/costCenter';
        const body = {
            "companyCode": `${companyCode}`
        }
        handlePostData(url, body);
    }
    const handleGLac = (companyCode) => {
        setSideLoading(true);
        const url = '/sap/nonpo/glAcc';
        const body = {
            "companyCode": `${companyCode}`
        }
        handlePostData(url, body);
    }
    const handleTaxCode = (companyCode) => {
        setSideLoading(true);
        const url = '/sap/nonpo/taxCodes';
        const body = {
            "companyCode": `${companyCode}`
        }
        handlePostData(url, body);
    }
    const handleHSNCode = (companyCode) => {
        setSideLoading(true);
        const url = '/sap/nonpo/hsn';
        const body = {
            "companyCode": `${companyCode}`
        }
        handlePostData(url, body);
    }
    const handleDefaultCurrency = (companyCode) => {
        setSideLoading(true);
        const url = '/sap/nonpo/defaultCurrency';
        const body = {
            "companyCode": `${companyCode}`
        }
        handlePostData(url, body);
    }
    const handleVerifyData = (postBody) => {
        const url = '/sap/nonpo/validation';
        const body = postBody;
        handlePostData(url, body);
    }

    const NoRowsOverlay = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: '8px', color: 'gray' }}>No rows added</span>
        </div>
    );

    useEffect(() => {
        handleCompanyCodeData();
        handleUOM();
        handleCurrency();
    }, [])

    useEffect(() => {
        setVerifyData((prevData) => ({
            ...prevData,
            InvDate: invdate.replaceAll("-", ""),
        }));
    }, [invdate]);

    return (

        <div>
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
                <div>
                    <div className="maincomponent">
                        <label><b>Vendor Details</b></label>
                        <div style={{ padding: '10px' }}>
                            <div className="df" style={{ margin: '0px 0px 15px 0px' }}>
                                <div>
                                    <label>Vendor No : </label>
                                    <TextField size="small" value={user} disabled style={{ width: '188px', margin: '-8px 50px 0px 50px' }}></TextField>
                                </div>
                                <div>
                                    <label><span style={{ color: 'red' }}>*</span> Invoice Date : </label>
                                    <TextField size="small" value={invdate} onChange={(e) => { setinvdate(e.target.value) }} style={{ width: '188px', margin: '-8px 5px 0px 50px' }} type="date"  ></TextField>
                                </div>
                            </div>
                            <div className="df" style={{ margin: '15px 0px 0px 0px' }}>
                                <div>
                                    <label>Email-id : </label>
                                    <TextField size="small" value={email} disabled style={{ width: '188px', margin: '-8px 50px 0px 68px' }} type="email"></TextField>
                                </div>
                                <div>
                                    <label><span style={{ color: 'red' }}>*</span> Invoice Number : </label>
                                    <TextField size="small" value={verifyData.InvNum} onChange={(e) => { setVerifyData(prev => ({ ...prev, InvNum: e.target.value })) }} style={{ width: '188px', margin: '-8px 5px 0px 27px' }}></TextField>
                                </div>
                            </div>
                            <div className="df" style={{ margin: '15px 0px' }}>
                                <div >
                                    <label>Upload Invoice : </label>
                                    <TextField size="small" style={{ margin: '-8px 5px 0px 20px' }} type="file" value={verifyData.PdfName} onChange={(e) => { setVerifyData(prev => ({ ...prev, PdfName: (e.target.value) })) }}></TextField>
                                </div>
                            </div>
                            {/* <div className="df" style={{ margin: '15px 0px 0px 0px' }}>
                        <div>
                            <label>Digital Signature : </label>
                            <label></label>
                        </div>
                    </div> */}
                        </div>
                    </div>
                    <div className="maincomponent">
                        <label><b>Company Details</b></label>
                        <div style={{ padding: '10px' }}>
                            <div className="df" style={{ margin: '0px 0px 15px 0px' }}>
                                <div>
                                    <label><span style={{ color: 'red' }}>*</span> Company Code : </label>
                                    <TextField
                                        id="CompCode"
                                        select
                                        size='small'
                                        style={{ width: '188px', margin: '-8px 48px 0px 10px' }}
                                        value={verifyData.CompCode}
                                        // onChange={(e) => { setVerifyData(prev => ({ ...prev, CompCode: e.target.value })) }}
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;

                                            setVerifyData(prev => ({ ...prev, CompCode: event.target.value }))
                                            // setFieldValue('Land1', selectedValue);
                                            if (!selectedValue) { }
                                            else {
                                                setSideLoading(true);
                                                handleBussinessPlace(selectedValue);
                                                handleCostCenter(selectedValue);
                                                handleGLac(selectedValue);
                                                handleTaxCode(selectedValue);
                                                handleHSNCode(selectedValue);
                                                handleDefaultCurrency(selectedValue);
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
                                {sideLoading ? (
                                    <div style={{margin: '0px 25px 0px -40px'}}>
                                        <CircularProgress style={{ color: '#ea1214' }} size={15}/>
                                    </div>
                                ) : (<div></div>)}
                                <div>
                                    <label>Bussiness Place : </label>
                                    <TextField
                                        id="BussPlace"
                                        select
                                        size='small'
                                        style={{ width: '188px', margin: '-8px 5px 0px 90px' }}
                                        value={verifyData.BussPlace}
                                        onChange={(e) => { setVerifyData(prev => ({ ...prev, BussPlace: e.target.value })) }}
                                    >
                                        {bussinessPlace.length > 0 ? (
                                            bussinessPlace.map((option) => (
                                                <MenuItem key={option.businessPlace} value={option.businessPlace}>
                                                    {option.businessPlace}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No options available</MenuItem>
                                        )}
                                    </TextField>
                                </div>
                            </div>
                            <div className="df" style={{ margin: '15px 0px' }}>
                                <div>
                                    <label><span style={{ color: 'red' }}>*</span> Cost Center : </label>
                                    <TextField
                                        id="CostCenter"
                                        select
                                        size='small'
                                        style={{ width: '188px', margin: '-8px 48px 0px 36px' }}
                                        value={verifyData.CostCenter}
                                        onChange={(e) => { setVerifyData(prev => ({ ...prev, CostCenter: e.target.value })) }}
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
                                        value={verifyData.BookConfNum}
                                        onChange={(e) => { setVerifyData(prev => ({ ...prev, BookConfNum: e.target.value })) }}
                                    />
                                </div>
                            </div>
                            <div className="df" style={{ margin: '15px 0px 0px 0px' }}>
                                <div>
                                    <label><span style={{ color: 'red' }}>*</span> GL Account : </label>
                                    <TextField
                                        id="GlAcc"
                                        select
                                        size='small'
                                        style={{ width: '188px', margin: '-8px 5px 0px 40px' }}
                                        value={verifyData.GlAcc}
                                        onChange={(e) => { setVerifyData(prev => ({ ...prev, GlAcc: e.target.value })) }}
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

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                                <label><b>Vendor Details</b></label>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlinePostAdd />} onClick={handleAddRow}>Add</Button>
                                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineDeleteOutline />} color="error" onClick={handleDeleteSelected}>Delete Selected</Button>
                            </div>
                        </div>
                        <div>
                            <DataGrid
                                rows={lineItems}
                                columns={columns}
                                slots={{ noRowsOverlay: NoRowsOverlay }}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                style={{ padding: '5px', minHeight: '250px' }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                                onRowSelectionModelChange={(newSelection) => { handleSelectionChange(newSelection) }}
                            // onRowSelectionModelChange={(newSelection) => {
                            //     setSelectedRows(newSelection);  // Update the selected rows
                            //     calculateTotal(newSelection);   // Recalculate the total
                            // }}
                            />
                        </div>
                        <div style={{ padding: '10px 0px 0px 0px', marginTop: '10px' }}>
                            <div className="df" style={{ margin: '0px 0px 15px 0px' }}>
                                <div>
                                    <label>Total Value : </label>
                                    <TextField size="small" value={verifyData.TotalAmt} disabled style={{ width: '188px', margin: '-8px 20px 0px 20px' }} />
                                </div>
                                <div>
                                    <label>Currency : </label>
                                    <TextField
                                        select
                                        size="small"
                                        value={verifyData.Currency}
                                        style={{ width: '188px', margin: '-8px 5px 0px 20px' }}
                                        onChange={(e) => { setVerifyData(prev => ({ ...prev, Currency: e.target.value })) }}
                                    >
                                        {currency.length > 0 ? (
                                            currency.map((option) => (
                                                <MenuItem key={option.currencyCode} value={option.currencyCode}>
                                                    {option.currencyCode} ({option.Description})
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

                    <div className="maincomponent" style={{ display: 'flex', justifyContent: 'end' }}>
                        <Button color="warning" onClick={handleClearAll}>Clear</Button>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>









                    <Dialog fullWidth={true} maxWidth={'xs'} open={openError} onClose={handleCloseErrorDiolog}>
                        <DialogTitle>Please enter all mandetry Details</DialogTitle>
                        <DialogContent dividers>
                            <p>Fields to be Filled : {errorMessage}</p>
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


                    <Dialog fullWidth={true} maxWidth={'xs'} open={openSubmit} onClose={handleCloseSubmitDiolog}>
                        <DialogTitle>Confirm to Submit</DialogTitle>
                        <DialogContent dividers>
                            <p>Do you want to submit Invoice number : {verifyData.InvNum} ??</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSubmitDiolog} color="error">
                                Cancel
                            </Button>
                            <Button onClick={handleMainPost} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert icon={<GoUpload />} onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Your invoice <b> {verifyData.InvNum} </b> has been submitted.
                        </Alert>
                    </Snackbar>
                </div>
            )}
        </div>
    );
}

export default VendorNonPOInvoiceUpload;