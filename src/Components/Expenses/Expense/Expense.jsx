import React, { useEffect, useState } from 'react'
import './Expense.css'
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import { RiShare2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiQrScan, BiSolidEdit, BiSolidError } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaMinus, FaPlus, FaRegUser, FaUser } from "react-icons/fa6";
import { MdOutlineCopyAll } from "react-icons/md";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    IconButton,
    Snackbar,
    Alert
} from '@mui/material';
import api from '../../../Utils/ApiCalls/Api';
import { TbNotesOff } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import FullScreenLoader from '../../../Utils/Loading/FullScreenLoader';
import { IoCallOutline, IoCloudDone } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import DynamicQR from '../../../Utils/QRCode/DynamicQR';
import uploadImage from '../../../Utils/FireBase/UploadImage';
// import api from '../../../Utils/ApiCalls/Api';

const Expense = () => {

    // const data = [
    //     { id: 1, costcenter: "234490", expense: "Office & Other Supplies", amount: '$89.09', requested: '89.09' }
    // ]

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 100 },
    //     { field: 'costcenter', headerName: 'Cost Center', width: 130 },
    //     { field: 'expense', headerName: 'Expense', width: 130 },
    //     { field: 'currency', headerName: 'Currency', width: 130 },
    //     { field: 'amount', headerName: 'Amount', width: 130 },
    //     { field: 'requested', headerName: 'Requested', width: 130 },
    // ];

    const [tdata, setTData] = useState([]);                 //table data
    const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    // const { token, user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const [qr, setQr] = useState(false);
    const [invno, setInvno] = useState('');
    const [value, setValue] = useState('http://invoice/');
    const currentEpochTimeMs = new Date().getTime();

    // const currentEpochTimeMs = new Date().getTime();
    // console.log(currentEpochTimeMs);

    // const nav = useNavigate();

    // const [postData, setPostData] = useState({
    //     CustomerNumber: user,
    //     CustomerName: user,
    //     OrderDate: '',
    //     SalesOrderNumber: "",
    //     salesOrderNav: []
    // })
    const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
    // const [materialData, setMaterialData] = useState([]);
    // const [id, setId] = useState(1);                        //auto increment for id in tdata
    // const [formData, setFormData] = useState([]);           //pop-up table row data
    // const [openAddExpense, setOpenAddExpense] = useState(false);    //pop-up open/close
    // const [errors, setErrors] = useState([]);               //handeling pop-up error
    // const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);        //for success display snackbar
    const [successMessage, setSuccessMessage] = useState([]);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);


    const [cocode, setcocode] = useState([]);
    const [costce, setcostce] = useState([]);
    const [postData, setPostData] = useState({
        Bukrs: '',
        Blart: 'SA',
        Bldat: '',
        Budat: '',
        Smtpadr: localStorage.getItem('email'),
        Purpose: '',
        Waers: '',
        Bktxt: '',
        ExpenseType: '',
        ItemNav: []
    })

    const currentDate = () => {
        const date = new Date();
        let currentDay = String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        // console.log("The current date is " + currentDate);

        setPostData(prev => ({ ...prev, Bldat: currentDate }));
        setPostData(prev => ({ ...prev, Budat: currentDate }));

    }

    // console.log(currentDate);

    const handleSuccessSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSuccessSnackbarOpen(false);
    };

    const handleErrorSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackbarOpen(false);
    };

    // on selecting or un-selecting the rows in table live change
    const handleSelectionChange = (selection) => {
        setSubmitExp(selection);
        const selectedData = selection.map(id => tdata.find(row => row.id === id));
        console.log(selectedData);
        setSRows(selectedData);

        setPostData(prev => ({
            ...prev,
            ItemNav: selectedData.map(({ id, ...rest }) => rest)
        }));

        setPostData(prevPostData => ({
            ...prevPostData,
            ItemNav: prevPostData.ItemNav.map(item => ({
                ...item,
                DmbtrR: item.Dmbtr // Update DmbtrR to match Dmbtr
            }))
        }));

    };

    // open add expense pop-up
    const handleClickOpenExpense = () => {
        setFormData([]);
        setOpenAddExpense(true);
    };


    const columns = [
        {
            field: 'Xblnr',
            headerName: 'Invoice No',
            width: 120,
            renderCell: (params) => (
                <TextField
                    // type="number"
                    value={params.value || ''}
                    onChange={(e) => {
                        handleCellChange(e, params);
                        // calculateTotal(selectedRows); // Call calculateTotal after a change
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'Kostl',
            headerName: 'Cost Center',
            width: 140,
            renderCell: (params) => (
                <TextField
                    select
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                >
                    {costce.length > 0 ? (
                        costce.map((option) => (
                            <MenuItem key={option.cost} value={option.cost}>
                                {option.cost} ({option.costCenText})
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </TextField>
                // <TextField
                //     value={params.value || ''}
                //     onChange={(e) => handleCellChange(e, params)}
                //     size="small"
                //     fullWidth
                //     style={{ marginTop: '5px' }}
                // />
            ),
        },
        {
            field: 'ItemText',
            headerName: 'Item Text',
            width: 135,
            renderCell: (params) => (
                <TextField
                    // type="number"
                    value={params.value || ''}
                    onChange={(e) => {
                        handleCellChange(e, params);
                        // calculateTotal(selectedRows); // Call calculateTotal after a change
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'ItemExpenseType',
            headerName: 'Expense Type',
            width: 140,
            renderCell: (params) => (
                <TextField
                    select
                    value={params.value || ''}
                    onChange={(e) => handleCellChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                >
                    {expenseType.length > 0 ? (
                        expenseType.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.value}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>No options available</MenuItem>
                    )}
                </TextField>
            ),
        },
        {
            field: 'Description',
            headerName: 'Description',
            width: 200,
            renderCell: (params) => (
                <TextField
                    // type="number"
                    value={params.value || ''}
                    onChange={(e) => {
                        handleCellChange(e, params);
                        // calculateTotal(selectedRows); // Call calculateTotal after a change
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        {
            field: 'Dmbtr',
            headerName: 'Amount',
            width: 135,
            renderCell: (params) => (
                <TextField
                    value={params.value || ''}
                    onChange={(e) => {
                        const inputValue = e.target.value;

                        // Check if the value is a valid number before updating
                        if (!isNaN(inputValue) || inputValue === '') {
                            handleCellChange(e, params); // Only update if it's a valid number or empty
                        }
                    }}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        // {
        //     field: 'Amount',
        //     headerName: 'Amount',
        //     width: 150,
        //     renderCell: (params) => (
        //         <TextField
        //             type="number"
        //             value={params.value || ''}
        //             onChange={(e) => {
        //                 handleCellChange(e, params);
        //                 // calculateTotal(selectedRows); // Call calculateTotal after a change
        //             }}
        //             size="small"
        //             fullWidth
        //             style={{ marginTop: '5px' }}
        //         />
        //     ),
        // },
        {
            field: 'qr',
            headerName: 'Uplode Doc with QR',
            width: 180,
            renderCell: (params) => (
                // <TextField
                //     // type="file"
                //     // onChange={(e) => handleFileChange(e, params)}
                //     size="small"
                //     fullWidth
                //     style={{ marginTop: '5px' }}
                // />
                <Button endIcon={<BiQrScan />} color='info' onClick={() => { setQr(true); setInvno(params.row.docTime); }} >Scan here</Button>
            ),
        },
        {
            field: 'Document',
            headerName: 'Document',
            width: 250,
            renderCell: (params) => (
                <TextField
                    type="file"
                    onChange={(e) => handleFileChange(e, params)}
                    size="small"
                    fullWidth
                    style={{ marginTop: '5px' }}
                />
            ),
        },
        // {
        //     field: 'Document',
        //     headerName: 'Document',
        //     width: 270,
        //     renderCell: (params) => (
        //         <TextField
        //             type="file"
        //             value={params.value || ''}
        //             onChange={(e) => {
        //                 handleCellChange(e, params);
        //                 // calculateTotal(selectedRows); // Call calculateTotal after a change
        //             }}
        //             size="small"
        //             fullWidth
        //             style={{ marginTop: '5px' }}
        //         />
        //     ),
        // },
    ];

    const handleFileChange = (event, params) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            // Get the file extension (e.g., '.pdf', '.jpeg')
            const fileExtension = file.name.split('.').pop();
            const ModifyedDocNumber = params.row.docTime; // Get the current row's invoice number (e.g., INV123)

            // If the invoice number is available, use it as the document name
            const newDocumentName = ModifyedDocNumber ? `${ModifyedDocNumber}.${fileExtension}` : file.name;

            const updatedRows = tdata.map((row) =>
                row.id === params.id
                    ? { ...row, Document: newDocumentName } // Update the document name in the row
                    : row
            );
            setTData(updatedRows);

            // Here you can send the `file` to the server if needed
            console.log('File uploaded for row:', params.id, newDocumentName);
        }
    };

    // const handleFileChange = (event, params) => {
    //     const file = event.target.files[0]; // Get the selected file
    //     if (file) {
    //         const updatedRows = tdata.map((row) =>
    //             row.id === params.id
    //                 ? { ...row, Document: file.name } // Update the document name in the row
    //                 : row
    //         );
    //         setTData(updatedRows);

    //         // Here you can send the `file` to the server if needed
    //         console.log('File uploaded for row:', params.id, file);
    //     }
    // };

    const handleAddRow = () => {
        const newRow = {
            id: tdata.length + 1, // Ensure unique ID for each row
            Xblnr: "",
            Kostl: "",
            ItemText: "",
            ItemExpenseType: "",
            Description: "",
            Dmbtr: "",
            DmbtrR: "",
            Document: "",
            Hkont: "63006000",
            Tflag: false,
            docTime: currentEpochTimeMs
        };
        setTData([...tdata, newRow]);
    };

    const handleCellChange = (e, params) => {
        const updatedLineItems = [...tdata];
        const index = updatedLineItems.findIndex(item => item.id === params.id);
        if (index !== -1) {
            updatedLineItems[index][params.field] = e.target.value;
            setTData(updatedLineItems);
        }
    };

    //delete the selected row in tdata in main table
    const deleteSelected = () => {
        const remainingData = tdata.filter(row => !submitExp.includes(row.id));
        setTData(remainingData);
        setSubmitExp([]);
        console.log(remainingData);
    };

    // const handlePostData = async (url, body) => {
    //     var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
    //     try {
    //         const response = await api.post(currentURL, body, {
    //             // headers: { 'Authorization': `Bearer ${token}` }
    //         });
    //         if (url.includes('createSales')) {
    //             console.log(response);
    //             setLoading(false);
    //             setSuccessMessage(response.data.message);
    //             setSuccessSnackbarOpen(true);
    //             // ---
    //             // setBussinessPlace(response.data.data.businessPlacesSet.results);
    //             // setSideLoading(false);
    //         }
    //     } catch (error) {
    //         console.error('unable to get the response', error);
    //         if (url.includes('createSales')) {
    //             //     // setErrorMessage(response.data);
    //             var ee = error.response.data.message;
    //             //     console.log(error.response.data.message);
    //             setLoading(false);
    //             //     // console.log(error.response.data.message);
    //             setErrorMessage(ee);
    //             setErrorSnackbarOpen(true);
    //             //     // setErrorMessage(response.data.message);
    //             //     // setOpenError(true);
    //             //     // setSideLoading(false);
    //         }
    //         // setSideLoading(false);
    //     }
    // };

    // const handlePostExpense = (body) => {
    //     setLoading(true);
    //     // setSideLoading(true);
    //     const url = '/public/createSales';
    //     // const body = 
    //     handlePostData(url, body);
    // }

    const submitExpense = () => {
        setLoading(true);
        var mainD = postData;

        var mainD = postData;

        mainD.Bldat = mainD.Bldat.replaceAll('-', '');
        mainD.Budat = mainD.Budat.replaceAll('-', '');

        // mainD.ItemNav.DmbtrR = mainD.ItemNav.Dmbtr;

        // console.log(mainD.ItemNav.Dmbtr);

        mainD.ItemNav.forEach(async (item) => {
            if (item.Document) {
                const file = {
                    name: item.Document, // Assuming this is the document name with extension
                    docTime: item.docTime, // Assuming this is the timestamp for each document
                };
                await uploadImage(file);
            }
        });

        console.log(mainD);

        // uploadImage(mainD.ItemNav.Document);

        // if (mainD.OrderDate === "" || mainD.OrderDate === undefined || mainD.OrderDate === null) {
        //     console.log(mainD.OrderDate);
        //     setErrorMessage("Select Date");
        //     setErrorSnackbarOpen(true);
        // } else if (mainD.salesOrderNav < 1) {
        //     console.log("no rows");
        //     setErrorMessage("Add or Select atleast one row");
        //     setErrorSnackbarOpen(true);
        // } else {
        //     // console.log(mainD.OrderDate);
        //     mainD.OrderDate = mainD.OrderDate.replaceAll('-', '');

        //     console.log(mainD);
        //     // console.log(mainD.OrderDate);
        // handlePostExpense(mainD);

        //     // nav("/order-to-cash/display");
        // }
        setLoading(false);
    }

    const getCalling = async (url) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL);
            if (url.includes('costCenter')) {
                console.log(response);
                // console.log(response.data.data.message);
                console.log(response.data.data);
                setcostce(response.data.data);
                setLoading(false);
            } else if (url.includes('cmpCodes')) {
                console.log(response.data.data);
                setcocode(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('unable to get the response', error);
            setLoading(false);
        }
    };

    const handlePostData = async (url, body) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(currentURL, body, {
                // headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('createExpense')) {
                console.log(response);
                setLoading(false);
                setSuccessMessage(response.data.message);
                setSuccessSnackbarOpen(true);
                // setBussinessPlace(response.data.data.businessPlacesSet.results);
                // setSideLoading(false);
            }
        } catch (error) {
            console.error('unable to get the response', error);
            if (url.includes('createExpense')) {
                // setErrorMessage(response.data);
                var ee = error.response.data.message;
                console.log(error.response.data.message);
                setLoading(false);
                // console.log(error.response.data.message);
                setErrorMessage(ee);
                setErrorSnackbarOpen(true);
                // setErrorMessage(response.data.message);
                // setOpenError(true);
                // setSideLoading(false);
            }
            // setSideLoading(false);
        }
    };

    const handleCostCenter = () => {
        setLoading(true);
        const url = '/public/costCenter';
        getCalling(url);
    };
    const handleCompanyCode = () => {
        setLoading(true);
        const url = '/public/cmpCodes';
        getCalling(url);
    };

    const handlePostExpense = (body) => {
        setLoading(true);
        // setSideLoading(true);
        const url = '/public/createExpense';
        // const body = 
        handlePostData(url, body);
    }

    const Purpose = [
        { value: 'Expense', label: 'Expense' },
        { value: 'Travel', label: 'Travel' },
    ]

    const expensetype = [
        { value: 'Business Development', label: 'Business Development' },
        // { value: 'Development', label: 'Development' },
        { value: 'Project', label: 'Project' }
    ]

    const currency = [
        { value: 'INR', label: '₹' },
        { value: 'USD', label: '$' },
    ]

    const expenseType = [
        { value: 'FOOD', label: 'FOOD' },
        { value: 'FLIGHT', label: 'FLIGHT' },
        { value: 'CAB', label: 'CAB' },
        { value: 'TRAIN', label: 'TRAIN' },
        { value: 'BUS', label: 'BUS' },
        { value: 'EVENTS', label: 'EVENTS' },
        { value: 'TEAM LUNCH', label: 'TEAM LUNCH' },
        { value: 'TEAM OUT', label: 'TEAM OUT' },
        { value: 'OTHERS', label: 'OTHERS' }
    ]

    const NoRowsOverlay = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: '8px', color: 'gray' }}>No Rows Added</span>
        </div>
    );

    useEffect(() => {
        // handleMaterialData();
        handleCostCenter();
        handleCompanyCode();

        currentDate();
    }, [])

    return (
        <>
            {loading && <FullScreenLoader />}
            {/* {qr && <DynamicQR />} */}
            {qr && <DynamicQR value={value + invno} setQr={setQr} invno={invno} />}
            <div className='df'>

                {/* <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexWrap: 'wrap' }}> */}
                <div className='maincomponent' style={{ paddingBottom: '15px', width: '65%' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexWrap: 'wrap' }}>
                        <div className='basic-margin'>
                            <p >Company Code</p>
                            <TextField
                                id="companycode"
                                select
                                size='small'
                                style={{ width: '165px' }}
                                onChange={(e) => { setPostData(prev => ({ ...prev, Bukrs: e.target.value })) }}
                            >
                                {cocode.length > 0 ? (
                                    cocode.map((option) => (
                                        <MenuItem key={option.code} value={option.code}>
                                            {option.code} ({option.companyText})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div className='basic-margin'>
                            <p >Document type</p>
                            <TextField disabled value={postData.Blart} style={{ width: '165px' }} size='small' />
                            {/* <TextField onChange={(e) => { setPostData(prev => ({ ...prev, doctype: e.target.value })) }} size='small' /> */}
                        </div>
                        <div className='basic-margin'>
                            <p >Document Date</p>
                            <TextField value={postData.Bldat} size='small' style={{ width: '165px' }} className='date' disabled type='date' />
                            {/* onChange={(e) => { setPostData(prev => ({ ...prev, docdate: e.target.value })) }} */}
                        </div>
                        <div className='basic-margin'>
                            <p >Purpose</p>
                            <TextField
                                id="Purpose"
                                select
                                size='small'
                                style={{ width: '165px' }}
                                onChange={(e) => { setPostData(prev => ({ ...prev, Purpose: e.target.value })) }}
                            >
                                {Purpose.length > 0 ? (
                                    Purpose.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div className='basic-margin'>
                            <p >Expense Type</p>
                            <TextField
                                id="ExpenseType"
                                select
                                size='small'
                                style={{ width: '165px' }}
                                onChange={(e) => { setPostData(prev => ({ ...prev, ExpenseType: e.target.value })) }}
                            >
                                {expensetype.length > 0 ? (
                                    expensetype.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                        {/* </div>
                    <div className='df'> */}
                        <div className='basic-margin'>
                            <p >Currency</p>
                            <TextField
                                id="Waers"
                                select
                                size='small'
                                style={{ width: '165px' }}
                                onChange={(e) => { setPostData(prev => ({ ...prev, Waers: e.target.value })) }}
                            >
                                {currency.length > 0 ? (
                                    currency.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label} ({option.value})
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No options available</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div className='basic-margin'>
                            <p >Document Header Text</p>
                            <TextField onChange={(e) => { setPostData(prev => ({ ...prev, Bktxt: e.target.value })) }} style={{ width: '165px' }} size='small' />
                        </div>
                        {/* <div className='basic-margin'>
                            <p >QR</p>
                            <Button startIcon={<BiQrScan />} color='info' onClick={() => { setQr(true) }} />
                            {/* <TextField onChange={(e) => { setPostData(prev => ({ ...prev, Bktxt: e.target.value })) }} style={{ width: '165px' }} size='small' /> 
                        </div> */}

                    </div>
                </div>
                <div className='maincomponent' style={{ width: '30%', padding: '20px' }}>
                    <div>
                        <p><FaRegUser /><b> Name : </b> {localStorage.getItem('firstName') + " " + localStorage.getItem('lastName')}</p>
                        <p><FiMail /><b> Email : </b> {localStorage.getItem('email')}</p>
                        <p><IoCallOutline /><b> Mobile : </b> {localStorage.getItem('mobile')}</p>

                    </div>

                </div>
            </div>
            <div className='maincomponent'>

                <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                    <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlinePostAdd />} onClick={handleAddRow}>Add</Button>
                    {/* <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineCopyAll />} color='warning' onClick={copySeletedRowsIds}>Copy</Button> */}
                    <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineDeleteOutline />} color="error" onClick={deleteSelected}>Delete</Button>
                </div>
                {/* table */}
                <div style={{ marginTop: '10px' }}>
                    <div style={{ height: 400, width: '100%' }}>
                        {/* table data from use state automatically updated from usestate => tdata */}
                        <DataGrid
                            rows={tdata}
                            columns={columns}
                            slots={{ noRowsOverlay: NoRowsOverlay }}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                            }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            onRowSelectionModelChange={handleSelectionChange}
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
                {/* table */}
                <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                    <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" onClick={submitExpense} startIcon={<RiShare2Fill />} >Submit Expense</Button>
                    {/* onClick={submitExpense} */}
                </div>
            </div>

            <Snackbar
                open={successSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSuccessSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert icon={<IoCloudDone />} onClose={handleSuccessSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleErrorSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert icon={<BiSolidError />} onClose={handleErrorSnackbarClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Expense;