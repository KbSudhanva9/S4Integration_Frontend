import { Button, CircularProgress, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../../Utils/ApiCalls/Api";
import { IoSearch } from "react-icons/io5";
import { RiArrowGoBackFill } from "react-icons/ri";

const ASNVendorTrackStatus = () => {


    const [asnno, setasnno] = useState('');
    const [pono, setpono] = useState('');
    const [loading, setLoading] = useState(true);

    const [tdata, setTData] = useState([]);
    const { token, user } = useSelector((state) => state.auth);
    const columns = [
        { field: 'asnNumber', headerName: 'ASN Number', width: 110 },
        { field: 'PoNumber', headerName: 'PO Number', width: 110 },
        { field: 'itemNo', headerName: 'Item No', width: 90 },
        { field: 'matnr', headerName: 'Material', width: 100 },
        { field: 'poQty', headerName: 'PO Qty', width: 80 },
        { field: 'asnQty', headerName: 'ASN Qty', width: 80 },
        { field: 'asnCreatedDate', headerName: 'ASN Submitted Date', width: 90 },
        { field: 'asnDeliveryDate', headerName: 'ASN Delivery Date', width: 90 },
        { field: 'inbDeliverDate', headerName: 'In-bound Delivery Date', width: 90 },
        { field: 'inbCreatedDate', headerName: 'In-bound Created Date', width: 90 },
        { field: 'status', headerName: 'Delivery Status', width: 110 },
        { field: 'approvedOrRejected', headerName: 'Approved/Rejected', width: 140 },
        { field: 'remarks', headerName: 'Remarks', width: 210 },
    ];

    const handlePostData = async (url, body) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(statusSearchURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (url.includes('status')) {
                const formattedLineItems = response.data.data.asnStatusNav.results.map((item, index) => ({
                    id: index + 1,
                    asnNumber: item.asnNumber,
                    PoNumber: item.PoNumber,
                    itemNo: item.itemNo,
                    matnr: item.matnr,
                    poQty: item.poQty,
                    asnQty: item.asnQty,
                    asnCreatedDate: item.asnCreatedDate,
                    asnDeliveryDate: item.asnDeliveryDate,
                    inbDeliverDate: item.inbDeliverDate,
                    inbCreatedDate: item.inbCreatedDate,
                    status: item.status,
                    approvedOrRejected: item.approvedOrRejected,
                    remarks: item.remarks,
                }));
                setTData(formattedLineItems);
                setLoading(false);
            }
        } catch (error) {
            console.log('Search failed', error);
            setLoading(false);
        }
    };

    // const hhh =()=>{
    //     console.log(asnno);
    // }

    const handlePOdetailsAndLineItems = () => {
        setLoading(true);
        var url = '/sap/asn/status';
        const body = {
            "po_no": `${pono}`,
            "portal_ref": `${asnno}`,
        }
        handlePostData(url, body);
    }

    const clear = () => {
        setasnno("");
        setpono("");
        handlePOdetailsAndLineItems();
    }

    useEffect(() => {
        clear();
    }, [])

    return (
        <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px' }}>

            <div className="df" style={{ padding: '0px 10px' }}>

                <div className="df">
                    <p >Vendor :</p>
                    <TextField disabled value={user} size="small" style={{ width: '188px', margin: '7px 15px 7px 15px' }}></TextField>
                </div>
                <div className="df">
                    <p>ASN Number :</p>
                    <TextField size="small" value={asnno} onChange={(e) => { setasnno(e.target.value) }} style={{ width: '188px', margin: '7px 15px 7px 15px' }}></TextField>
                </div>
                <div className="df">
                    <p>PO Number :</p>
                    <TextField size="small" value={pono} onChange={(e) => { setpono(e.target.value) }} style={{ width: '188px', margin: '7px 15px 7px 15px' }}></TextField>
                </div>
                <div className="df" style={{ margin: '9px 15px 9px 15px' }}>
                    <Button startIcon={<IoSearch />} variant="contained" onClick={handlePOdetailsAndLineItems} size="small">Search</Button>
                </div>
                <div className="df" style={{ margin: '9px 15px 9px 15px' }}>
                    <Button startIcon={<RiArrowGoBackFill />} variant="contained" color="warning" onClick={clear} size="small">Clear</Button>
                </div>
            </div>

            <div style={{ height: '73vh' }}>

                {loading ? (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        // backgroundColor: '#ccc',
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

                    <DataGrid
                        rows={tdata}
                        columns={columns}
                    // height='80%'
                    // initialState={{
                    //     pagination: {
                    //         paginationModel: { page: 0, pageSize: 5 },
                    //     },
                    // }}
                    // pageSizeOptions={[5, 10]}
                    // checkboxSelection
                    // onRowSelectionModelChange={handleSelectionChange}
                    />

                )}
            </div>
        </div>
    );
}

export default ASNVendorTrackStatus;