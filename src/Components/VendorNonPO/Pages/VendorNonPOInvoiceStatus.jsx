import { Button, TextField } from "@mui/material";
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FiFilter } from "react-icons/fi";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../../Utils/ApiCalls/Api";


const VendorNonPOInvoiceStatus = () => {

    const { token, user } = useSelector((state) => state.auth);

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
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handleNonPoStatus = () => {
        var url = '/sap/nonpo/status';
        const body = postFilterData;
        console.log(postFilterData);
        handlePostData(url, body);
    }

    useEffect(()=>{
        handleNonPoStatus();
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
                    onChange={(e) => { setFilterData(prev => ({ ...prev, venInvNum: e.target.value })) }}
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
                    onChange={(e) => { setFilterData(prev => ({ ...prev, cmpInvNum: e.target.value })) }}
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
                // onClick={handleStatusSearch}
                >
                    Search
                </Button>
            </div>
            <div >
                <DataGrid
                    rows={tdata}
                    columns={columns}
                />
            </div>
        </div >
    );
}

export default VendorNonPOInvoiceStatus;