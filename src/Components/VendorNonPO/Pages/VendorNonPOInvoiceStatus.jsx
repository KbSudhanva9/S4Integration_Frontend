import { Button, CircularProgress, TextField } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FiFilter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../Utils/ApiCalls/Api";
import { TbNotesOff } from "react-icons/tb";


const VendorNonPOInvoiceStatus = () => {

    const { token, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    

    const [tdata, setTData] = useState([]);
    const columns = [
        { field: 'Date', headerName: 'Date', width: 90 },
        { field: 'VenInvNum', headerName: 'Vendor Invoice Number', width: 130 },
        { field: 'CompInvNum', headerName: 'Company Invice Number', width: 130 },
        { field: 'NatureOfDesc', headerName: 'Nature Of Description', width: 170 },
        { field: 'Uom', headerName: 'UOM', width: 70 },
        { field: 'Qty', headerName: 'Qty', width: 70 },
        { field: 'Amt', headerName: 'Amt', width: 80 },
        { field: 'Curr', headerName: 'Currency', width: 80 },
        { field: 'Status', headerName: 'Status', width: 120 },
        { field: 'ApprOrRej', headerName: 'ApprOrRej', width: 130 },
        { field: 'Remarks', headerName: 'Remarks', width: 90 }
    ];

    const [filterData, setFilterData] = useState({
        fromDate: "",
        toDate: "",
        venInvNum: "",
        cmpInvNum: ""
    });
    const [postFilterData, setPostFilterData] = useState({
        fromDate: "",
        toDate: "",
        venInvNum: "",
        cmpInvNum: ""
    });


    const handlePostData = async (url, body) => {
        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(statusSearchURL, body, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log(response);
            if (url.includes('status')) {
                const formattedLineItems = response.data.data.results.map((item, index) => ({
                    id: index + 1,
                    Date: item.Date,
                    VenInvNum: item.VenInvNum,
                    CompInvNum: item.CompInvNum,
                    NatureOfDesc: item.NatureOfDesc,
                    Uom: item.Uom,
                    Qty: item.Qty,
                    Amt: item.Amt,
                    Curr: item.asnDeliveryDate,
                    Status: item.Status,
                    ApprOrRej: item.ApprOrRej,
                    Remarks: item.Remarks,
                }));
                setTData(formattedLineItems);
                setLoading(false);
            }
        } catch (error) {
            console.log('Search failed', error);
            setLoading(false);
        }
    };

    const handleNonPoStatus = () => {
        setLoading(true);
        var url = '/sap/nonpo/status';
        const body = postFilterData;
        console.log(postFilterData);
        handlePostData(url, body);
    }

    const handleClear = () => {

        var body = {
            fromDate: "",
            toDate: "",
            venInvNum: "",
            cmpInvNum: ""
        }

        setFilterData(body);
        setPostFilterData(body);

        var url = '/sap/nonpo/status';
        handlePostData(url, body);
    };

    const NoRowsOverlay = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: '8px', color: 'gray' }}>No data available</span>
        </div>
    );

    useEffect(() => {
        handleClear();
    }, [])

    return (
        <div className="maincomponent" style={{ margin: '0px', padding: '20px' }}>
            <div style={{ margin: '5px 5px' }}>
                <span>Vendor No :</span>
                <TextField
                    style={{ margin: '-10px 0px 0px 88px' }}
                    id="outlined-basic"
                    size='small'
                    variant="outlined"
                    value={user}
                    disabled
                />
            </div>
            <div style={{ margin: '15px 5px' }}>
                <span>Invoice Date :</span>
                <TextField
                    style={{ margin: '-10px 10px 0px 76px' }}
                    id="outlined-basic"
                    size='small'
                    variant="outlined"
                    value={filterData.fromDate}
                    onChange={(e) => { (setFilterData(prev => ({ ...prev, fromDate: e.target.value }))), (setPostFilterData(prevd => ({ ...prevd, fromDate: (e.target.value).replaceAll('-', '') }))) }}
                    type="date"
                />
                <span> - </span>
                <TextField
                    style={{ margin: '-10px 0px 0px 12px' }}
                    id="outlined-basic"
                    size='small'
                    variant="outlined"
                    value={filterData.toDate}
                    onChange={(e) => { (setFilterData(prev => ({ ...prev, toDate: e.target.value }))), (setPostFilterData(prevd => ({ ...prevd, toDate: (e.target.value).replaceAll('-', '') }))) }}
                    type="date"
                />
            </div>
            <div style={{ margin: '15px 5px' }}>
                <span>Vendor Invoice No :</span>
                <TextField
                    style={{ margin: '-10px 0px 0px 33px' }}
                    id="outlined-basic"
                    size='small'
                    variant="outlined"
                    value={filterData.venInvNum}
                    onChange={(e) => { (setFilterData(prev => ({ ...prev, venInvNum: e.target.value }))), (setPostFilterData(prevd => ({ ...prevd, venInvNum: (e.target.value) }))) }}
                />
            </div>
            <div style={{ margin: '15px 5px 5px 5px' }}>
                <span>Company Invoice No :</span>
                <TextField
                    style={{ margin: '-10px 0px 0px 15px' }}
                    id="outlined-basic"
                    size='small'
                    variant="outlined"
                    value={filterData.cmpInvNum}
                    onChange={(e) => { (setFilterData(prev => ({ ...prev, cmpInvNum: e.target.value }))), (setPostFilterData(prevd => ({ ...prevd, cmpInvNum: (e.target.value) }))) }}
                />
            </div>
            <div style={{ margin: '10px 0px' }}>

                <Button
                    style={{ margin: '0px 0px 0px 12px' }}
                    size='small'
                    variant="contained"
                    startIcon={<FiFilter />}
                    onClick={handleNonPoStatus}
                >
                    Filter
                </Button>

                <Button
                    style={{ margin: '0px 0px 0px 12px' }}
                    size='small'
                    variant="contained"
                    color='warning'
                    startIcon={<RiArrowGoBackFill />}
                    onClick={handleClear}
                >
                    Clear
                </Button>
            </div>
            <div >
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
                    <DataGrid
                        rows={tdata}
                        columns={columns}
                        slots={{ noRowsOverlay: NoRowsOverlay }}
                    />
                )}
            </div>
        </div >
    );
}

export default VendorNonPOInvoiceStatus;