import { Avatar, Box, Button, Card, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import "./ASNVendor.css"
import { IoFileTrayFull } from "react-icons/io5";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../../Utils/ApiCalls/Api";

const ASNVendorDetails = () => {

    const [lineItems, setLineItems] = useState([]);
    const nav = useNavigate();
    // const [lineItems, setLineItems] = useState([
    //     {
    //         id: 1,
    //         LineNo: "0010",
    //         Matnr: "MAT001",
    //         Maktx: "Material Description 1",
    //         Menge: "100",
    //         DeliveryDate: "2024-09-01",
    //         AsnQty: "90",
    //         AsnDeliveryDate: "2024-09-02",
    //         ShippingInstruction: "Handle with care",
    //         PackageInformation: "Box",
    //         ModeOfTransportation: "Air"
    //     },
    //     {
    //         id: 2,
    //         LineNo: "0020",
    //         Matnr: "MAT002",
    //         Maktx: "Material Description 2",
    //         Menge: "200",
    //         DeliveryDate: "2024-09-05",
    //         AsnQty: "180",
    //         AsnDeliveryDate: "2024-09-06",
    //         ShippingInstruction: "Fragile",
    //         PackageInformation: "Crate",
    //         ModeOfTransportation: "Sea"
    //     }
    // ]);
    const { token, user } = useSelector((state) => state.auth);
    const { po } = useOutletContext();

    const [cardData, setCardData] = useState({
        "PoNumber": "",
        "PoType": "",
        "Currency": "",
        "CreatedOn": "",
        "ShippingAddr": ""
    });

    // const columns = [
    //     { field: 'LineNo', headerName: 'Item No', width: 90 },
    //     { field: 'Matnr', headerName: 'Material', width: 90 },
    //     { field: 'Maktx', headerName: 'Material Dsec', width: 140 },
    //     { field: 'Menge', headerName: 'Order Qty.', width: 90 },
    //     { field: 'DeliveryDate', headerName: 'Delivery Date', width: 110 },
    //     { field: 'AsnQty'(display value), headerName: 'Asn Submitted Qty', width: 130 },

    //     { field: 'AsnQty'(modify value), headerName: 'Asn Qty', width: 130, <TextField type='date' /> },

    //     { field: 'AsnDeliveryDate'(modify value), headerName: 'ASN Delivery Date', width: 90, <TextField type='date' /> },
    //     { field: 'ShippingInstruction'(modify value), headerName: 'Shipping Details', width: 90, <TextField type='date' /> },
    //     { field: 'PackageInformation'(modify value), headerName: 'Package Info', width: 90, <TextField type='date' /> },
    //     { field: 'ModeOfTransportation'(modify value), headerName: 'Mode Of Transportation', width: 90, <TextField type='date' /> },
    // ];

    const columns = [
        { field: 'LineNo', headerName: 'Item No', width: 90 },
        { field: 'Matnr', headerName: 'Material', width: 90 },
        { field: 'Maktx', headerName: 'Material Desc', width: 140 },
        { field: 'Menge', headerName: 'Order Qty.', width: 90 },
        { field: 'DeliveryDate', headerName: 'Delivery Date', width: 110 },
        { field: 'AsnQtyFrom', headerName: 'Asn Submitted Qty', width: 130 },
        {
            field: 'AsnQtyTo',
            headerName: 'Asn Qty',
            width: 130,
            renderCell: (params) => (
                <TextField
                    type="number"
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{top: '5px'}}
                />
            ),
        },
        {
            field: 'AsnDeliveryDate',
            headerName: 'ASN Delivery Date',
            width: 140,
            renderCell: (params) => (
                <TextField
                    type="date"
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{top: '5px'}}
                />
            ),
        },
        {
            field: 'ShippingInstruction',
            headerName: 'Shipping Details',
            width: 140,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{top: '5px'}}
                />
            ),
        },
        {
            field: 'PackageInformation',
            headerName: 'Package Info',
            width: 140,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{top: '5px'}}
                />
            ),
        },
        {
            field: 'ModeOfTransportation',
            headerName: 'Mode Of Transportation',
            width: 170,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{top: '5px'}}
                />
            ),
        },
    ];

    const handleCellChange = (event, params) => {
        const { id, field } = params;
        const { value } = event.target;

        // Update the lineItems state here
        setLineItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handlePostData = async (url, body) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(statusSearchURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            setCardData(preCardData => ({ ...preCardData, PoNumber: response.data.data.PoNumber, PoType: response.data.data.PoType, Currency: response.data.data.Currency, CreatedOn: response.data.data.CreatedOn, ShippingAddr: response.data.data.ShippingAddr}));

            if (url.includes('details')) {
                const formattedLineItems = response.data.data.asnLineitemsNav.results.map((item, index) => ({
                    id: index + 1,
                    LineNo: item.LineNo,
                    Matnr: item.Matnr,
                    Maktx: item.Maktx,
                    Menge: item.Menge,
                    DeliveryDate: item.DeliveryDate,
                    AsnQtyFrom: item.AsnQty,
                    AsnQtyTo: item.AsnQty,
                    AsnDeliveryDate: item.AsnDeliveryDate,
                    ShippingInstruction: item.ShippingInstruction,
                    PackageInformation: item.PackageInformation,
                    ModeOfTransportation: item.ModeOfTransportation,
                    // approvedOrRejected: item.approvedOrRejected,
                    // remarks: item.remarks,
                }));
                setLineItems(formattedLineItems);
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handlePOdetailsAndLineItems = () => {
        var url = '/sap/asn/details';
        const body = {
            "po_no": `${po}`
        }
        handlePostData(url, body);
    }

    const handleSelectionChange = (selection) => {
        // Map selected row IDs to actual row data
        const selectedData = selection.map(id => lineItems.find(row => row.id === id));
        console.log(selectedData);
        // Calculate total amount for the selected rows
        // const totalAmount = selectedData.reduce((total, item) => {
        //     return total + parseFloat(item.Netwr);
        // }, 0);

        // Update total amount
        // setTotalAmt(totalAmount);

        // Update line items and payload
        // setLineItems(selectedData); // Update lineItems state
        // setPayload(prevPayload => ({
        //     ...prevPayload,
        //     "TotalSubAmt": totalAmount.toFixed(3), // Update total amount in payload
        //     "po_lineitemSet": {
        //         "results": selectedData // Update results with selected data
        //     }
        // }));
    };

    useEffect(()=>{
        handlePOdetailsAndLineItems();
    }, [])

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Card style={{ margin: '15px', width: '345px' }}>
                    <Box >
                        <CardHeader title={<Typography ><b>Purchase Order Details</b></Typography>} />
                        <CardContent style={{ padding: '0px 0px 16px 25px' }}>
                            <div style={{ display: 'flex' }}>
                                <p style={{ margin: '5px 10px 5px 0px' }}>Purchase Name</p>
                                <p style={{ margin: '5px' }}>{cardData.PoNumber}</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ margin: '5px 18px 5px 0px' }}>Purchase Type</p>
                                <p style={{ margin: '5px' }}>{cardData.PoType}</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ margin: '5px 60px 5px 0px' }}>Currency</p>
                                <p style={{ margin: '5px' }}>{cardData.Currency}</p>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ margin: '5px 47px 5px 0px' }}>Created on</p>
                                <p style={{ margin: '5px' }}>{cardData.CreatedOn}</p>
                            </div>
                        </CardContent>
                    </Box>
                </Card>
                <Card style={{ margin: '15px', width: '345px' }}>
                    <Box >
                        <CardHeader title={<Typography ><b>Shipping Details</b></Typography>} />
                        <CardContent style={{ padding: '0px 0px 16px 25px' }}>
                            <div style={{ display: 'flex' }}>
                                {/* <p style={{margin: '5px 10px 5px 0px'}}>Purchase Name</p> */}
                                <p style={{ margin: '5px' }}>{cardData.ShippingAddr}</p>
                            </div>
                        </CardContent>
                    </Box>
                </Card>
            </div>
            <div style={{margin: '5px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px' }}>
                <b>Details</b>
                <DataGrid
                    rows={lineItems}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    style={{padding: '5px'}}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelection) => handleSelectionChange(newSelection)}
                />
            </div>

            <div style={{ margin: '15px 5px 5px 5px', backgroundColor: '#fff', padding: '10px', borderRadius: '5px', display: 'flex', justifyContent: 'end' }}>
                    <Button onClick={()=>{nav(-1);}} style={{ margin: '0px 5px'}} size='small' color="error" variant="outlined">Close</Button>
                    <Button onClick={()=>{handleSelectionChange();}} style={{ margin: '0px 5px'}} size='small' color="success" variant="outlined" >Create ASN</Button>
            </div>
        </div>
    );
}

export default ASNVendorDetails;