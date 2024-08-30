import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import './VendorInvoicing.css'
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../Utils/ApiCalls/Api";
import { FaCheck, FaRegHandPointRight } from "react-icons/fa6";
import { LuArrowRightFromLine } from "react-icons/lu";
import { PiArrowDownRightLight } from "react-icons/pi";
import { FaAngleDoubleRight } from "react-icons/fa";

const VendorInvoicingNewInvoice = () => {

    const { token, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [sideLoading, setSideLoading] = useState(false);



    const [podata, setPodata] = useState({
        "POTYPE": "",
        "CRET_DATE": "",
        "PAYMENT_TERM": "",
        "PMNT_TM_DESCP": "",
        "address": "",

    });           //value for the field data
    const [totalAmt, setTotalAmt] = useState(0);        //to set the total amt
    // const [tdata, setTData] = useState([]);

    const [poList, setPOList] = useState([]);           //getting from api po numbers
    const [lineItems, setLineItems] = useState([]);


    const [openError, setOpenError] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);

    const [payload, setPayload] = useState({
        "VenderNo": `${user}`,//has to fill
        "PoNo": "",//fill
        "PortalNo": "",
        "InvoiceNo": "",//fill
        "InvoiceDate": "",//fill in yyyymmdd format
        "InvioceDocu": "",
        "Email": localStorage.getItem('email'),
        "TotalSubAmt": "",//fill without commas
        "po_lineitemSet": {
            "results": lineItems
        }
    });

    const handleClear = () => {
        setPayload({
            "VenderNo": `${user}`,//has to fill
            "PoNo": "",//fill
            "PortalNo": "",
            "InvoiceNo": "",//fill
            "InvoiceDate": "",//fill in yyyymmdd format
            "InvioceDocu": "",
            "Email": localStorage.getItem('email'),
            "TotalSubAmt": "",//fill without commas
            "po_lineitemSet": {
                "results": []
            }
        })

        setPodata({
            "POTYPE": "",
            "CRET_DATE": "",
            "PAYMENT_TERM": "",
            "PMNT_TM_DESCP": "",
            "address": "",

        })

        setLineItems([]);
    }
    const handleCloseErrorDiolog = () => {
        setOpenError(false);
    };
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleGetData = async (url) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(statusSearchURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('getPoList')) {
                setPOList(response.data.data.results);
                setLoading(false);
            }
        } catch (error) {
            console.log('Search failed', error);
            setLoading(false);
        }
    };
    const handlePostData = async (url, body) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(statusSearchURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            console.log(response.data.data);

            setPodata(prePOData => ({ ...prePOData, POTYPE: response.data.data.POTYPE, CRET_DATE: formatDate(response.data.data.CRET_DATE), PAYMENT_TERM: response.data.data.PAYMENT_TERM, PMNT_TM_DESCP: response.data.data.PMNT_TM_DESCP, address: response.data.data.address }))
            if (url.includes('getPoDetails')) {
                const formattedLineItems = response.data.data.po_lineitemSet.results.map((item, index) => ({
                    id: index + 1,
                    LineNo: item.LineNo,
                    Item: item.Item,
                    ItemDesc: item.ItemDesc,
                    OrderQuantity: item.OrderQuantity,
                    DeliverQuantity: item.DeliverQuantity,
                    InvoiceQty: item.InvoiceQty,
                    Taxcode: item.Taxcode,
                    Taxamt: item.Taxamt,
                    Netpr: item.Netpr,
                    Netwr: item.Netwr,
                    PoNo: item.PoNo,
                    PortalNo: item.PortalNo,
                    Uom: item.Uom,
                    InvoiceSubmittedQty: item.InvoiceSubmittedQty
                }));
                setLineItems(formattedLineItems);
                setSideLoading(false);
            } else if (url.includes('poInvSubmit')) {
                console.log(response);
                setSnackbarOpen(true);
                handleClear();
            }
        } catch (error) {
            console.log('Search failed', error);
            if (url.includes('poInvSubmit')) {
                console.log(error.response);
                var ee = error.response.data.message;
                setErrorMessage(ee);
                setOpenError(true);
            }
        }
    };

    const handlePODataLineItemsData = () => {
        setLoading(true);
        var url = '/sap/vim/getPoList';
        handleGetData(url);
    }
    const handlePOdetailsAndLineItems = (poNumber) => {
        setSideLoading(true);
        var url = '/sap/vim/getPoDetails';
        const body = {
            "puchaseOrderNo": `${poNumber}`
        }
        handlePostData(url, body);
    }
    const handlePOInvoiceSubmit = (postBody) => {
        var url = '/sap/vim/poInvSubmit';
        const body = postBody
        handlePostData(url, body);
    }

    const columns = [
        { field: 'LineNo', headerName: 'Item No', width: 100 },
        { field: 'Item', headerName: 'Item Id', width: 100 },
        { field: 'ItemDesc', headerName: 'Description', width: 160 },
        { field: 'OrderQuantity', headerName: 'Order Qty.', width: 100 },
        { field: 'DeliverQuantity', headerName: 'Delivery Qty.', width: 110 },
        { field: 'InvoiceSubmittedQty', headerName: 'Invoice Submitted Qty.', width: 170 },
        { field: 'InvoiceQty', headerName: 'Inv Qty.', width: 90 },
        { field: 'Taxcode', headerName: 'Tax Code', width: 90 },
        { field: 'Netpr', headerName: 'Net Price', width: 90 },
        { field: 'Netwr', headerName: 'Net Value', width: 90 },
    ];
    // const handleSelectionChange = (selection) => {
    //     const selectedData = selection.map(id => tdata.find(row => row.id === id));
    // };
    const handleSelectionChange = (selection) => {
        // Map selected row IDs to actual row data
        const selectedData = selection.map(id => lineItems.find(row => row.id === id));
        const cleanedLineItems = selectedData.map(({ id, ...rest }) => rest);
        console.log(cleanedLineItems);
        // Calculate total amount for the selected rows
        const totalAmount = selectedData.reduce((total, item) => {
            return total + parseFloat(item.Netwr);
        }, 0);

        // Update total amount
        setTotalAmt(totalAmount);
        setPayload(prevPayload => ({
            ...prevPayload,
            "TotalSubAmt": totalAmount.toFixed(3), // Update total amount in payload
            "po_lineitemSet": {
                "results": cleanedLineItems // Update results with selected data
            }
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'PoNo') {
            // console.log(value);
            setSideLoading(true);
            handlePOdetailsAndLineItems(value);
        }

        setPayload((prevPayload) => {
            const updatedPayload = {
                ...prevPayload,
                [name]: value
            };
            return updatedPayload;
        });
    };

    const formatDate = (dateStr) => {
        if (!dateStr || dateStr.length !== 8) return '';
        const year = dateStr.substring(0, 4);
        const month = dateStr.substring(4, 6);
        const day = dateStr.substring(6, 8);
        return `${year}/${month}/${day}`;
    };

    const poInvSubmit = () => {

        const formattedDate = payload.InvoiceDate.replaceAll('-', '');
        const fileName = payload.InvioceDocu.split('\\').pop();

        const updatedData = {
            ...payload,
            InvoiceDate: formattedDate,
            InvioceDocu: fileName,
        };
        console.log(updatedData);

        handlePOInvoiceSubmit(updatedData);
    }

    useEffect(() => {
        handlePODataLineItemsData();
        handleClear();
    }, []);

    // useEffect(() => {
    // console.log(poList);
    // console.log(lineItems);
    // }, [poList, lineItems]);

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
                    <div style={{ padding: '10px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <b>Invoice Details</b>
                        <div className='df'>
                            <div className="three" >
                                <div className="minMargin">
                                    <div className="df minMargin">
                                        <label style={{ padding: '8px 95px 0px 0px' }} htmlFor="VenderNo">VenderNo : </label>
                                        <TextField disabled style={{ width: '200px' }} size='small' type="text" name="VenderNo" value={payload.VenderNo} />
                                    </div>
                                    <div className="df minMargin">
                                        <label style={{ padding: '8px 103px 0px 0px' }} htmlFor="PoNo">PO. No : <span style={{ color: 'red' }}>*</span></label>
                                        <Select
                                            size="small"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={payload.PoNo}
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
                                    <div className="df minMargin">
                                        <label style={{ padding: '8px 25px 0px 0px' }} htmlFor="InvoiceNo">Vendor Invoice No : <span style={{ color: 'red' }}>*</span></label>
                                        <TextField style={{ width: '200px' }} size='small' type="text" value={payload.InvoiceNo} name="InvoiceNo" onChange={handleChange} />
                                    </div>
                                    <div className="df minMargin">
                                        <label style={{ padding: '8px 66px 0px 0px' }} htmlFor="InvoiceDate">Invoice Date : <span style={{ color: 'red' }}>*</span></label>
                                        <TextField style={{ width: '200px' }} size='small' type="Date" value={payload.InvoiceDate} name="InvoiceDate" onChange={handleChange} />
                                    </div>
                                    <div className="df minMargin">
                                        <label style={{ padding: '8px 121px 0px 0px' }} htmlFor="Email">E-mail : </label>
                                        <TextField disabled style={{ width: '200px' }} size='small' type="text" value={payload.Email} name="Email" />
                                    </div>
                                    <div className="df minMargin">
                                        <label style={{ padding: '8px 67px 0px 0px' }} htmlFor="InvioceDocu">Inv Document : </label>
                                        <TextField style={{ width: '200px' }} size='small' type="file" value={payload.InvioceDocu} name="InvioceDocu" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '50px', marginLeft: '15px', }}>
                                {/* border: '1px solid #ccc', borderRadius: '8px', padding: '5px'}}> */}
                                <div className="df minMargin">
                                    {/* <FaRegHandPointRight /> */}
                                    {/* <LuArrowRightFromLine  */}
                                    {/* <PiArrowDownRightLight  */}


                                    {sideLoading ? (
                                        <div style={{ margin: '8px 15px 0px -34px' }}>
                                            <CircularProgress style={{ color: '#ea1214' }} size={20} />
                                        </div>
                                    ) : (
                                        <div>
                                            <FaAngleDoubleRight style={{ color: '#ea1214', padding: '8px 0px 0px 0px', marginLeft: '-33px', marginRight: '15px', fontSize: 'larger' }} />
                                        </div>
                                    )}

                                    {/* <FaAngleDoubleRight style={{ padding: '8px 0px 0px 0px', marginLeft: '-33px', marginRight: '15px', fontSize: 'larger' }} /> */}
                                    <label style={{ padding: '8px 70px 0px 0px' }} htmlFor="poType">PO Type : </label>
                                    <TextField disabled style={{ width: '240px' }} size='small' type="text" value={podata.POTYPE} name="poType" />
                                </div>
                                <div className="df minMargin">
                                    <label style={{ padding: '8px 39px 0px 0px' }} htmlFor="createdDate">Created Date : </label>
                                    <TextField disabled style={{ width: '240px' }} size='small' type="text" value={podata.CRET_DATE} name="createdDate" />
                                </div>
                                <div className="df minMargin">
                                    <label style={{ padding: '8px 24px 0px 0px' }} htmlFor="paymentTerms">Payment Terms : </label>
                                    <TextField disabled style={{ width: '240px' }} size='small' type="text" value={podata.PAYMENT_TERM + ", " + podata.PMNT_TM_DESCP} name="paymentTerms" />
                                </div>
                                <div className="df minMargin">
                                    <label style={{ padding: '8px 15px 0px 0px' }} htmlFor="deliveryAdd">Delivery Address : </label>
                                    <TextField disabled style={{ width: '240px' }} multiline maxRows={4} size='small' type="text" value={podata.address} name="deliveryAdd" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ padding: '10px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>

                            {sideLoading ? (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: '#fff',
                                    // paddingTop: '35vh',
                                    backdropFilter: 'blur(5px)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1100
                                }}>
                                    <CircularProgress style={{ color: '#ea1214' }} />
                                </div>
                            ) : (
                                // <div style={{ padding: '10px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                                <div style={{ marginTop: '10px' }}>
                                    <div style={{ height: 200, width: '100%' }}>
                                        {/* <DataGrid
                            rows={lineItems}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionChange}
                        /> */}
                                        <DataGrid
                                            rows={lineItems}
                                            columns={columns}
                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            checkboxSelection
                                            onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
                                        />

                                    </div>
                                </div>
                                // </div>
                            )}
                        </div>
                    </div>
                    <div style={{ padding: '5px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <div className="df minMargin">
                            <label style={{ padding: '8px 15px 0px 0px' }} htmlFor="totalAmt">Total Amount : </label>
                            <TextField disabled style={{ width: '200px' }} size='small' type="text" value={totalAmt} name="totalAmt" />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <Button style={{ margin: '0px 10px' }} color="warning" variant="outlined" onClick={handleClear}>Clear</Button>
                        <Button style={{ margin: '0px 10px' }} color="success" variant="outlined" onClick={poInvSubmit}>Submit</Button>
                    </div>


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


                    <Snackbar
                        open={snackbarOpen}
                        autoHideDuration={3000}
                        onClose={handleSnackbarClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    >
                        <Alert icon={<FaCheck />} onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                            Your invoice has been submitted.
                        </Alert>
                    </Snackbar>
                </div >
            )}
        </div>
    );
}

export default VendorInvoicingNewInvoice;