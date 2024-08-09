import { Button, MenuItem, Select, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import './VendorInvoicing.css'
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../Utils/ApiCalls/Api";

const VendorInvoicingNewInvoice = () => {

    const { token, user } = useSelector((state) => state.auth);


    const [podata, setPodata] = useState([]);           //value for the field data
    const [totalAmt, setTotalAmt] = useState(0);        //to set the total amt
    const [tdata, setTData] = useState([]);

    const [poList, setPOList] = useState([]);           //getting from api po numbers

    const [lineItems, setLineItems] = useState([]);

    const [payload, setPayload] = useState({
        "VenderNo": `${user}`,//has to fill
        "PoNo": "",//fill
        "PortalNo": "",
        "InvoiceNo": "",//fill
        "InvoiceDate": "",//fill in yyyymmdd format
        "Email": localStorage.getItem('email'),
        "TotalSubAmt": "",//fill without commas
        "po_lineitemSet": {
            "results": lineItems
        }
    });

    useEffect(() => {
        handlePODataLineItemsData();
    }, []);

    useEffect(() => {
        console.log(poList);
        console.log(lineItems);
    }, [poList, lineItems]);

    const handleGetData = async (url) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(statusSearchURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('getPoList')) {
                setPOList(response.data.data.results);
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };
    const handlePostData = async (url, body) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(statusSearchURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('getPoDetails')) {
                const formattedLineItems = response.data.data.results.map((item, index) => ({
                    id: index + 1,
                    LineNo: item.LineNo,
                    Item: item.Item,
                    ItemDesc: item.ItemDesc,
                    OrderQuantity: item.OrderQuantity,
                    DeliverQuantity: item.DeliverQuantity,
                    InvoiceQty: item.InvoiceQty,
                    Taxcode: item.Taxcode,
                    Netpr: item.Netpr,
                    Netwr: item.Netwr,
                    InvoiceSubmittedQty: item.InvoiceSubmittedQty
                }));

                setLineItems(formattedLineItems);
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handlePODataLineItemsData = () => {
        var url = '/sap/vim/getPoList';
        handleGetData(url);
    }
    const handlePOdetailsAndLineItems = (poNumber) => {
        var url = '/sap/vim/getPoDetails';
        const body = {
            "puchaseOrderNo": `${poNumber}`
        }
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
        console.log(selectedData);
        // Calculate total amount for the selected rows
        const totalAmount = selectedData.reduce((total, item) => {
            return total + parseFloat(item.Netwr);
        }, 0);
    
        // Update total amount
        setTotalAmt(totalAmount);
    
        // Update line items and payload
        // setLineItems(selectedData); // Update lineItems state
        setPayload(prevPayload => ({
            ...prevPayload,
            "TotalSubAmt": totalAmount.toFixed(3), // Update total amount in payload
            "po_lineitemSet": {
                "results": selectedData // Update results with selected data
            }
        }));
    };
    // const handleSelectionChange = (selection) => {
    //     const selectedData = selection.map(id => tdata.find(row => row.id === id));
        
    //     // Calculate the total amount for selected rows
    //     const totalAmount = selectedData.reduce((total, item) => {
    //         return total + parseFloat(item.Netwr);
    //     }, 0);
    
    //     setTotalAmt(totalAmount);
    
    //     // Update the payload with the selected line items
    //     setPayload(prevPayload => ({
    //         ...prevPayload,
    //         "po_lineitemSet": {
    //             "results": selectedData
    //         },
    //         "TotalSubAmt": totalAmount.toFixed(3) // Format the amount to 3 decimal places
    //     }));
    // };




    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(value);
        // console.log(name);
        if (name === 'PoNo') {
            console.log(value);
            handlePOdetailsAndLineItems(value);
        }

        setPayload((prevPayload) => {
            const updatedPayload = {
                ...prevPayload,
                [name]: value
            };
            //   console.log(updatedPayload);  // Log the updated payload
            return updatedPayload;
        });
    };
    // ===========================
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setPayload((prevPayload) => ({
    //       ...prevPayload,
    //       [name]: value
    //     }));

    //     console.log(payload);
    //   };
    // ===========================
    // const handlelog = (e) => {
    //     console.log(e.target.value);
    // };

    return (
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
                                <label style={{ padding: '8px 67px 0px 0px' }} htmlFor="invDoc">Inv Document : </label>
                                <TextField style={{ width: '200px' }} size='small' type="file" name="invDoc" />
                            </div>
                        </div>
                    </div>
                    <div style={{ paddingTop: '50px', marginLeft: '15px' }}>
                        <div className="df minMargin">
                            <label style={{ padding: '8px 70px 0px 0px' }} htmlFor="poType">PO Type : </label>
                            <TextField disabled style={{ width: '200px' }} size='small' type="text" value={podata.poType} name="poType" />
                        </div>
                        <div className="df minMargin">
                            <label style={{ padding: '8px 39px 0px 0px' }} htmlFor="createdDate">Created Date : </label>
                            <TextField disabled style={{ width: '200px' }} size='small' type="Date" value={podata.createdDate} name="createdDate" />
                        </div>
                        <div className="df minMargin">
                            <label style={{ padding: '8px 24px 0px 0px' }} htmlFor="paymentTerms">Payment Terms : </label>
                            <TextField disabled style={{ width: '200px' }} size='small' type="text" value={podata.paymentTerms} name="paymentTerms" />
                        </div>
                        <div className="df minMargin">
                            <label style={{ padding: '8px 15px 0px 0px' }} htmlFor="deliveryAdd">Delivery Address : </label>
                            <TextField disabled style={{ width: '200px' }} size='small' type="text" value={podata.deliveryAdd} name="deliveryAdd" />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ padding: '10px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
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
            </div>
            <div style={{ padding: '5px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                <div className="df minMargin">
                    <label style={{ padding: '8px 15px 0px 0px' }} htmlFor="totalAmt">Total Amount : </label>
                    <TextField disabled style={{ width: '200px' }} size='small' type="text" value={totalAmt} name="totalAmt" />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '15px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                <Button style={{ margin: '0px 10px' }} color="warning" variant="contained" onClick={() => { console.log('Payload', payload) }}>Clear</Button>
                <Button style={{ margin: '0px 10px' }} color="success" variant="contained" onClick={() => { console.log('Payload', payload) }}>Submit</Button>
            </div>

        </div >
    );
}

export default VendorInvoicingNewInvoice;