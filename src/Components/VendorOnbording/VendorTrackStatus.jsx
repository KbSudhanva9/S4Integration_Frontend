import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { IoSearchOutline } from "react-icons/io5";
import { DataGrid } from '@mui/x-data-grid';
import api from '../../Utils/ApiCalls/Api';
import { useNavigate } from 'react-router-dom';

const VendorTrackStatus = () => {

    const nav = useNavigate();

    const [tdata, setTData] = useState([]);
    const [refNo, setRefNo] = useState("");

    const columns = [
        { field: 'ref_no', headerName: 'Reference No', width: 130 },
        { field: 'name', headerName: 'Vendor Name', width: 130 },
        { field: 'contact_person', headerName: 'Contact Person', width: 130 },
        { field: 'email', headerName: 'Email', width: 230 },
        { field: 'created_date', headerName: 'Created Date', width: 130 },
        { field: 'subm_by', headerName: 'Submitted By', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

    const handleStatusSearch = async () => {

        setTData([]);


        // const statusSearchURL = `${import.meta.env.VITE_CROSS_ORIGIN_URL}${import.meta.env.VITE_VENDOR_ONBORDING_BASE_URL}` + `VendorSet('${refNo}')?$expand=vendorStatusNav`;

        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}`+'/sap/venStatus';

        try {
            const response = await api.post(statusSearchURL, 
                {
                    "referenceNo": `${refNo}`
                // }{
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Accept': 'application/json',
                //     'Authorization': 'Basic ' + btoa(`${import.meta.env.VITE_SAP_USER_NAME}:${import.meta.env.VITE_SAP_PASSWORD}`),
                //     'X-Requested-With': 'XMLHttpRequest'
                // }
            });
            // console.log(response.data.d.vendorStatusNav.results);
            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.data);
            // console.log(response.data.data.results);
            
            
            // const newData = response.data.d.vendorStatusNav.results.map((item, index) => ({
            const newData = response.data.data.results.map((item, index) => ({
                id: tdata.length + index + 1, 
                ref_no: item.ref_no,
                name: item.name,
                contact_person: item.contact_person,
                email: item.email,
                created_date: item.created_date,
                subm_by: item.subm_by,
                status: item.status,
            }));

            setTData(prevData => [...prevData, ...newData]);
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    return (
        <div>
            <header>
                <img
                    style={{ padding: "10px 0px 10px 20px", width: '185px', height: '30px' }}
                    src="https://tecnics.com/wp-content/uploads/2020/03/logo1.png"
                    alt="Logo"
                />
                <p style={{ marginRight: '11%' }}><b>Vendor Track Status</b></p>
                <Button
                    onClick={()=>{nav('/vendor-onbording-login')}}
                    style={{ margin: '10px', backgroundColor: '#eb0101' }}
                    variant="contained"
                    size='small'
                    color='error'
                >
                    Login
                </Button>
            </header>
            <div className='maincomponent'>
                <b>User Details</b>
                <div className='maincomponent'>
                    <span>Track Status Reference No </span>
                    <span style={{ color: 'red' }}>*</span>
                    <TextField
                        style={{ margin: '-10px 0px 0px 12px' }}
                        id="outlined-basic"
                        size='small'
                        variant="outlined"
                        value={refNo}
                        onChange={(e) => setRefNo(e.target.value)}
                    />
                    <Button
                        style={{ margin: '-6px 0px 0px 12px' }}
                        size='small'
                        variant="contained"
                        startIcon={<IoSearchOutline />}
                        onClick={handleStatusSearch}
                    >
                        Search
                    </Button>
                </div>
                <div className='maincomponent'>
                    <b>Track Status</b>
                    <DataGrid
                        rows={tdata}
                        columns={columns}
                        style={{ marginTop: '15px' }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                </div>
            </div>
        </div>
    );
};
export default VendorTrackStatus;