import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IoFileTrayFull } from "react-icons/io5";
import { TbFileDollar } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClipboardCheck } from "react-icons/lu";
import { LuAlertTriangle } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoReturnDownBack } from "react-icons/io5";
import { BiReset } from "react-icons/bi";
import { BiErrorAlt } from "react-icons/bi";





import Box from '@mui/material/Box'; import { useSelector } from "react-redux";
import './VendorInvoicing.css'
import { Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const VendorInvoicingPaymentRecived = () => {

    const { token, user } = useSelector((state) => state.auth);

    const [tdata, setTData] = useState([]);                 //table data
    // const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    // const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
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
    }];
    const columns = [
        { field: 'PortalNo', headerName: 'Portal No', width: 120 },
        { field: 'PoNo', headerName: 'PO Number', width: 130 },
        { field: 'InvoiceNo', headerName: 'Vendor Inv No', width: 140 },
        { field: 'Ebelp', headerName: 'Item Id', width: 100 },
        { field: 'Item', headerName: 'Item', width: 110 },
        { field: 'ItemDesc', headerName: 'Item Description', width: 170 },
        { field: 'baselin', headerName: 'Amount', width: 120 },
        { field: 'Netpr', headerName: 'Status', width: 100 },
        // { field: 'approved_rejected', headerName: 'Appr/Rej', width: 110 },
        // { field: 'Remarks', headerName: 'Remarks', width: 140 },
    ];
    // const handleSelectionChange = (selection) => {
    //     setSubmitExp(selection);
    //     const selectedData = selection.map(id => tdata.find(row => row.id === id));
    //     // console.log(selectedData);
    //     setSRows(selectedData);
    // };

    const handleData = () => {
        console.log('adf');
    }

    return (
        <div>
            <div>
                <p style={{ margin: '0px' }}>Vendor : {user}</p>
            </div>
            <div className="df">
                <div className="three">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#fff1b8', width: 56, height: 56 }} variant="rounded">
                                        <IoFileTrayFull style={{ color: '#c75f00' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={handleData} >Total Due </Typography>}
                                subheader="21600"
                            />
                        </Box>
                    </Card>
                </div>
                <div className="three">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#ffcce3', width: 56, height: 56 }} variant="rounded">
                                        <LuAlertTriangle style={{ color: '#d20000' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={handleData} >Over Due </Typography>}
                                subheader="21600"
                            />
                        </Box>
                    </Card>
                </div>
                <div className="three">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#c6fff9', width: 56, height: 56 }} variant="rounded">
                                        <BiErrorAlt style={{ color: '#007783' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={handleData} >Due Next 30 Days</Typography>}
                                subheader="0"
                            />
                        </Box>
                    </Card>
                </div>
                
            </div>
            <div className='df' style={{padding: '10px', margin: '10px', width: '96%', left: '1%', backgroundColor: '#fff', borderRadius: '8px' }}>
                <label style={{ padding: '10px 0px 0px 0px' }}>Portal No</label>
                <TextField style={{ margin: '0px 0px 0px 10px', width: '180px' }} size='small' variant="outlined" type='text' />
                {/* <label style={{ padding: '10px 0px 0px 15px' }}>Invoice Date</label>
                <TextField style={{ margin: '0px 0px 0px 10px' }} size='small' variant="outlined" type='date' /> */}
                <Button startIcon={<IoSearch />} style={{ margin: '0px 10px' }} variant='outlined' >Search</Button>
                <Button startIcon={<BiReset />} style={{ margin: '0px 10px' }} variant='outlined' color='warning' >Reset</Button>
            </div>
            <div style={{ padding: '10px', margin: '10px', width: '96%', backgroundColor: '#fff', borderRadius: '8px' }}>
                <div style={{ marginTop: '10px' }}>
                    <div style={{ height: 400, width: '100%' }}>
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
                            // checkboxSelection
                            // onRowSelectionModelChange={handleSelectionChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorInvoicingPaymentRecived;