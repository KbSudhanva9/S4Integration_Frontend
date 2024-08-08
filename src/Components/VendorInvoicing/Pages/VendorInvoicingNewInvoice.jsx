import { Button, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import './VendorInvoicing.css'
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

const VendorInvoicingNewInvoice = () => {

    const { token, user } = useSelector((state) => state.auth);

    const [lineItems, setLineItems] = useState([]);
    const [podata, setPodata] = useState([]);
    const [totalAmt, setTotalAmt] = useState(9);

    const [tdata, setTData] = useState([]);                 //table data
    const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
    const [id, setId] = useState(1);  
    const rows = [{
        LineNo: "00010",
        Item: "TG0014",
        ItemDesc: "Trading Good 0014,PD,Regular Proc.",
        OrderQuantity: "10.000",
        DeliverQuantity: "10.000",
        InvoiceSubmittedQty: "10.000",
        InvoiceQty: "0.000",
        Taxcode: "",
        Taxamt: "0.000",
        Netpr: "35.000",
        Netwr: "350.000",
    }
    ];


    // {
    //     "PoNo": "4500001274",
    //     "PortalNo": "",
    //     "LineNo": "00010",
    //     "Item": "TG0014",
    //     "ItemDesc": "Trading Good 0014,PD,Regular Proc.",
    //     "OrderQuantity": "10.000",
    //     "DeliverQuantity": "10.000",
    //     "InvoiceQty": "0.000",
    //     "Taxcode": "",
    //     "Taxamt": "0.000",
    //     "Netpr": "35.000",
    //     "Netwr": "350.000",
    //     "Uom": "",
    //     "InvoiceSubmittedQty": "10.000"
    // }

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
    const handleSelectionChange = (selection) => {
        setSubmitExp(selection);
        const selectedData = selection.map(id => tdata.find(row => row.id === id));
        // console.log(selectedData);
        setSRows(selectedData);
    };



    const [payload, setPayload] = useState({
        "VenderNo": `${user}`,//has to fill
        "PoNo": "",//fill
        "PortalNo": "",
        "InvoiceNo": "",//fill
        "InvoiceDate": "",//fill in yyyymmdd format
        "Email": "",
        "TotalSubAmt": "",//fill without commas
        "po_lineitemSet": {
            "results": lineItems
        }
    });

    // console.log(token);
    // console.log(user);

    // expected line items from table
    // [
    //     {
    //         "PoNo": "",//fill
    //         "PortalNo": "",
    //         "LineNo": "",
    //         "Item": "",//fill item id
    //         "ItemDesc": "",//fill
    //         "OrderQuantity": "",//fill without commas
    //         "DeliverQuantity": "",//fill without commas
    //         "InvoiceQty": "",//fill without commas
    //         "Taxcode": "",//fill
    //         "Taxamt": "0.000",
    //         "Netpr": "",//fill net price
    //         "Netwr": "",//fill net value
    //         "Uom": ""
    //     }
    // ]
    const handleChange = (e) => {
        const { name, value } = e.target;
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
                                <TextField style={{ width: '200px' }} size='small' type="text" name="PoNo" value={payload.PoNo} onChange={handleChange} />
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
                        {/* table data from use state automatically updated from usestate => tdata */}
                        <DataGrid
                            rows={tdata}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionChange}
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
            <div style={{display: 'flex', justifyContent:'flex-end', padding: '15px', margin: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
                <Button style={{ margin: '0px 10px' }} color="warning" variant="contained" onClick={() => { console.log('Payload', payload) }}>Clear</Button>
                <Button style={{ margin: '0px 10px' }} color="success" variant="contained" onClick={() => { console.log('Payload', payload) }}>Submit</Button>
            </div>

        </div >
    );
}

export default VendorInvoicingNewInvoice;