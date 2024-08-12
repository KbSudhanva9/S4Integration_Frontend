import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
import { IoFileTrayFull } from "react-icons/io5";
import { TbFileDollar } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClipboardCheck } from "react-icons/lu";
import { LuAlertTriangle } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { IoReturnDownBack } from "react-icons/io5";
import { BiReset } from "react-icons/bi";

import { CircularProgress, Box, Typography } from '@mui/material';




// import Box from '@mui/material/Box'; 
import { useSelector } from "react-redux";
import './VendorInvoicing.css'
import { Button, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import api from '../../../Utils/ApiCalls/Api';

const VendorInvoicingMyInv = () => {

    const { token, user } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [tdata, setTData] = useState([]);                 //table data
    // const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    // const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
    // const [id, setId] = useState(1);
    // const rows = [{
    //     LineNo: "00010",
    //     Item: "TG0014",
    //     ItemDesc: "Trading Good 0014,PD,Regular Proc.",
    //     OrderQuantity: "10.000",
    //     DeliverQuantity: "10.000",
    //     InvoiceSubmittedQty: "10.000",
    //     InvoiceQty: "0.000",
    //     Taxcode: "",
    //     Taxamt: "0.000",
    //     Netpr: "35.000",
    //     Netwr: "350.000",
    // }];
    const columns = [
        { field: 'portal_ref', headerName: 'Portal No', width: 100 },
        { field: 'po_no', headerName: 'PO Number', width: 110 },
        { field: 'vendor_inv_no', headerName: 'Vendor Inv No', width: 130 },
        { field: 'inv_date', headerName: 'Invoice Date', width: 100 },
        { field: 'item_ID', headerName: 'Item ID', width: 110 },
        { field: 'item_descp', headerName: 'Item Description', width: 170 },
        { field: 'amnt', headerName: 'Amount', width: 100 },
        { field: 'status', headerName: 'Status', width: 130 },
        { field: 'approved_rejected', headerName: 'Appr/Rej', width: 110 },
        { field: 'Remarks', headerName: 'Remarks', width: 140 },
    ];
    // const handleSelectionChange = (selection) => {
    //     setSubmitExp(selection);
    //     const selectedData = selection.map(id => tdata.find(row => row.id === id));
    //     // console.log(selectedData);
    //     setSRows(selectedData);
    // };

    const [cardData, setCardData] = useState({
        "Total_due": "",
        "Over_due": "",
        "Due_30": ""
    })

    const handlePostData = async (url, body) => {

        setLoading(true);
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(statusSearchURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            // console.log(response.data.data);
            setCardData(preCardData => ({ ...preCardData, Total_due: response.data.data.Total_due, Over_due: response.data.data.Over_due, Due_30: response.data.data.Due_30 }));

            // if (url.includes('getPoDetails')) {
            const formattedLineItems = response.data.data.po_inv_statusSet.results.map((item, index) => ({
                id: index + 1,
                portal_ref: item.portal_ref,
                po_no: item.po_no,
                vendor_inv_no: item.vendor_inv_no,
                inv_date: item.inv_date,
                item_ID: item.item_ID,
                item_descp: item.item_descp,
                amnt: item.amnt,
                status: item.status,
                approved_rejected: item.approved_rejected,
                Remarks: item.Remarks
            }));

            setTData(formattedLineItems);
            // }
        } catch (error) {
            console.log('Search failed', error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handlePostService = (keyValue) => {
        console.log('adf==>' + keyValue + '<==adf');
        var url = '/sap/vim/totalInvoices';
        const body = {
            "key": `${keyValue}`
        }
        handlePostData(url, body);
    }

    // const handleData = () => {
    //     console.log('adf');
    // }

    useEffect(() => {
        handlePostService('S');
    }, []);

    return (
        <div>

            <div>
                {/* {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                        <CircularProgress />
                    </Box>
                ) : ( */}
                    <p style={{ margin: '0px' }}>Vendor : {user}</p>
                {/* )} */}
            </div>


            <div className="df">
                <div className="four">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#fff1b8', width: 56, height: 56 }} variant="rounded">
                                        <IoFileTrayFull style={{ color: '#c75f00' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { handlePostService('S') }} >Total Invoice Submitted </Typography>}
                                subheader="44"
                            />
                        </Box>
                    </Card>
                </div>
                <div className="four">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#c6fff9', width: 56, height: 56 }} variant="rounded">
                                        <TbFileDollar style={{ color: '#007783' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { handlePostService('V') }} >Total Invoice Verified </Typography>}
                                subheader="39"
                            />
                        </Box>
                    </Card>
                </div>
                <div className="four">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#ffcce3', width: 56, height: 56 }} variant="rounded">
                                        <LuAlertTriangle style={{ color: '#d20000' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { handlePostService('B') }} >Total Invoice Blocked </Typography>}
                                subheader="5"
                            />
                        </Box>
                    </Card>
                </div>
                <div className="four">
                    <Card style={{ margin: '15px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: '#cbead7', width: 56, height: 56 }} variant="rounded">
                                        <LuClipboardCheck style={{ color: '#007c49' }} />
                                    </Avatar>
                                }
                                title={<Typography style={{ color: 'blue', cursor: 'pointer' }} onClick={() => { handlePostService('C') }} >Total Invoice Payment </Typography>}
                                subheader="36"
                            />
                        </Box>
                    </Card>
                </div>

            </div>
            <div className='df' style={{ padding: '10px', margin: '10px', width: '96%', left: '1%', backgroundColor: '#fff', borderRadius: '8px' }}>
                <label style={{ padding: '10px 0px 0px 0px' }}>Portal No</label>
                <TextField style={{ margin: '0px 0px 0px 10px', width: '180px' }} size='small' variant="outlined" type='text' />
                <label style={{ padding: '10px 0px 0px 15px' }}>Invoice Date</label>
                <TextField style={{ margin: '0px 0px 0px 10px' }} size='small' variant="outlined" type='date' />
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

export default VendorInvoicingMyInv;