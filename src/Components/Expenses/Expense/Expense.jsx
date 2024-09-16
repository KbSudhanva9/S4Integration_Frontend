import React, { useEffect, useState } from 'react'
import './Expense.css'
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import { RiShare2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";
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

const Expense = () => {

    // const data = [
    //     { id: 1, costcenter: "234490", expense: "Office & Other Supplies", Dmbtr: '$89.09', DmbtrR: '89.09' }
    // ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'Kostl', headerName: 'Cost Center', width: 130 },
        { field: 'expense', headerName: 'Expense', width: 130 },
        { field: 'Waers', headerName: 'Currency', width: 130 }, //currency
        { field: 'Dmbtr', headerName: 'Amount', width: 130 },
        { field: 'DmbtrR', headerName: 'Requested', width: 130 },
    ];

    const [tdata, setTData] = useState([]);                 //table data
    const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
    const [id, setId] = useState(1);                        //auto increment for id in tdata
    const [formData, setFormData] = useState([]);           //pop-up table row data
    const [openAddExpense, setOpenAddExpense] = useState(false);    //pop-up open/close
    const [errors, setErrors] = useState([]);               //handeling pop-up error
    const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar
    const email = localStorage.getItem('email');

    const [cocode, setcocode] = useState([]);
    const [costce, setcostce] = useState([]);
    const [postData, setPostData] = useState({
        cocode: '',
        doctype: '',
        docdate: '',
        refno: '',
        docheadertxt: '',
        tabelData: []
    })

    const [mainPost, setMainPost] = useState([]);

    // on selecting or un-selecting the rows in table live change
    const handleSelectionChange = (selection) => {
        setSubmitExp(selection);
        const selectedData = selection.map(id => tdata.find(row => row.id === id));
        console.log(selectedData);
        setSRows(selectedData);

        setPostData(prev => ({
            ...prev,
            tabelData: selectedData.map(({ expense, ...rest }) => rest)
        }));

        // setMainPost(selectedData.map(({ expense, ...rest }) => rest));
        // setMainPost((prev) => [...prev => (
        //     Bukrs: postData.cocode, 
        //     Blart: postData.doctype, 
        //     Bldat: (postData.docdate).replaceAll('-', '')), 
        //     Bldat: (postData.docdate).replaceAll('-', '')), 
        //     Xblnr: postData.refno, 
        //     Bktxt: postData.docheadertxt, 
        //     Buzei: postData.tabelData.id ]
        // )
        // setMainPost(prev =>(({ id, ...rest }) => rest));
        // Step 1: Set initial state by mapping through selectedData
        setMainPost(selectedData.map(({ expense, ...rest }) => ({ ...rest })));

        // Step 2: Update state with additional postData values
        setMainPost((prev) => prev.map(item => ({
            ...item,
            Bukrs: postData.cocode,
            Blart: postData.doctype,
            Bldat: postData.docdate.replaceAll('-', ''),
            Budat: postData.docdate.replaceAll('-', ''),
            Xblnr: postData.refno,
            Bktxt: postData.docheadertxt,
            Buzei: postData.tabelData.id
        })));

        // Step 3: Remove `id` key from each object in state
        setMainPost((prev) => prev.map(({ id, ...rest }) => ({ ...rest })));



        // setMainPost(prev=> ({
        //     ...prev, 
        // }))
    };

    // open add expense pop-up
    const handleClickOpenExpense = () => {
        setFormData([]);
        setOpenAddExpense(true);
    };
    // close add expense pop-up
    const handleCloseExpense = () => {
        setOpenAddExpense(false);
    };
    // add rows in add expense pop-up
    const handleExpenseAddRow = () => {
        let pData = { Mandt: "100", Bukrs: "", Blart: '', Bldat: '', Budat: '', Smtpadr: email, Xblnr: '', Bktxt: '', id: id, Kostl: '', expense: '', Waers: '', Dmbtr: '', DmbtrR: '', Hkont: "63006000", Tflag: true, Docno: "", Remarks: "" };
        setFormData((preData) => [...preData, pData]);
        setErrors([...errors, { Kostl: false, expense: false, Waers: '', Dmbtr: false, DmbtrR: false }]);
        setId(id + 1);
    };
    // delete row in add expense pop-up
    const handleDeleteRow = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);

        const newErrors = errors.filter((_, i) => i !== index);
        setErrors(newErrors);
    };
    // onchange update for text fields in add expense pop-up 
    const handleChange = (index, field, event) => {
        const newFormData = [...formData];
        newFormData[index][field] = event.target.value;
        setFormData(newFormData);

        const newErrors = [...errors];
        newErrors[index] = { ...newErrors[index], [field]: event.target.value === '' };
        setErrors(newErrors);
    };
    // submitting in add expense pop-up
    const handleSubmit = () => {
        const newErrors = formData.map(row => {
            return {
                Kostl: row.Kostl === '',
                expense: row.expense === '',
                Waers: row.Waers === '',
                Dmbtr: row.Dmbtr === '',
                DmbtrR: row.DmbtrR === '',
            };
        });

        const hasErrors = newErrors.some(row => Object.values(row).some(error => error));

        if (hasErrors) {
            setErrors(newErrors);
        } else {
            setTData([...tdata, ...formData]);
            setFormData([{ Kostl: '', expense: '', Dmbtr: '', DmbtrR: '' }]); // Reset formData after submit
            setErrors([{ Kostl: false, expense: false, Dmbtr: false, DmbtrR: false }]);
            handleCloseExpense();
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    const copySeletedRowsIds = () => {
        const ids = sRows.map(item => `${item.id}`).join(', ');
        const copyIds = 'ID : ' + ids;
        navigator.clipboard.writeText(copyIds).then(() => {
            console.log('Copied to clipboard:', copyIds);
            setSnackbarOpen(true);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    //delete the selected row in tdata in main table
    const deleteSelected = () => {
        const remainingData = tdata.filter(row => !submitExp.includes(row.id));
        setTData(remainingData);
        setSubmitExp([]);
        console.log(remainingData);
    };

    const submitExpense = () => {
        console.log(tdata);
        console.log(postData);
        console.log(mainPost);
    }

    const getCalling = async (url) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL);
            if (url.includes('costCenter')) {
                console.log(response);
                console.log(response.data.data);
                setcostce(response.data.data);
            } else if (url.includes('cmpCodes')) {
                console.log(response.data.data);
                setcocode(response.data.data);
            }
        } catch (error) {
            console.error('unable to get the response', error);
        }
    };

    const handleCostCenter = () => {
        const url = '/public/costCenter';
        getCalling(url);
    };
    const handleCompanyCode = () => {
        const url = '/public/cmpCodes';
        getCalling(url);
    };

    // const cocode = [
    //     { value: '1000', label: 'Company Code 1000' },
    //     { value: '2000', label: 'Company Code 2000' },
    //     { value: '3000', label: 'BestRun USA' },
    // ];

    // const costce = [
    //     { value: '1000', label: 'Cost center' },
    //     { value: '1100', label: 'Manufacturing 1 (US)' },
    //     { value: '2000', label: 'Production Unit Plant 2000' },
    // ];

    const NoRowsOverlay = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: '8px', color: 'gray' }}>No Rows Added</span>
        </div>
    );

    const Waers = [
        { value: 'INR', label: '₹' },
        { value: 'USD', label: '$' },
    ]

    useEffect(() => {
        handleCostCenter();
        handleCompanyCode();
    }, [])

    return (
        <div className='maincomponent'>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Company Code</p>
                    <TextField
                        id="companycode"
                        select
                        size='small'
                        style={{ width: '221px' }}
                        onChange={(e) => { setPostData(prev => ({ ...prev, cocode: e.target.value })) }}
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
                    <p>Document type</p>
                    <TextField onChange={(e) => { setPostData(prev => ({ ...prev, doctype: e.target.value })) }} size='small' />
                </div>
                <div className='basic-margin'>
                    <p>Document Date</p>
                    <input className='date' onChange={(e) => { setPostData(prev => ({ ...prev, docdate: e.target.value })) }} type='date' style={{ width: '221px' }} />
                </div>
            </div>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Refrence Number</p>
                    <TextField onChange={(e) => { setPostData(prev => ({ ...prev, refno: e.target.value })) }} size='small' />
                </div>
                <div className='basic-margin'>
                    <p>Document Header Text</p>
                    <TextField onChange={(e) => { setPostData(prev => ({ ...prev, docheadertxt: e.target.value })) }} size='small' />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlinePostAdd />} onClick={handleClickOpenExpense}>Add</Button>
                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<MdOutlineCopyAll />} color='warning' onClick={copySeletedRowsIds}>Copy</Button>
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
                    />
                </div>
            </div>
            {/* table */}
            <div style={{ display: 'flex', justifyContent: 'end', margin: '10px' }}>
                <Button style={{ margin: '0px 5px' }} size="small" variant="outlined" startIcon={<RiShare2Fill />} onClick={submitExpense}>Submit Expense</Button>
            </div>


            {/* <Dialog fullWidth={true} maxWidth={'sm'} open={openAddExpense} onClose={handleCloseExpense} >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add Expense
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseExpense}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <MdOutlineClose />
                </IconButton>
                <DialogContent dividers>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseExpense}>
                        Add
                    </Button>
                    <Button autoFocus color='error' onClick={handleCloseExpense}>
                        close
                    </Button>
                </DialogActions>
            </Dialog> */}

            {/* add expenses pop-up */}
            <Dialog fullWidth={true} maxWidth={'md'} open={openAddExpense} onClose={handleCloseExpense}>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent dividers>
                    <Button onClick={handleExpenseAddRow} color='success' startIcon={<FaPlus />} >Add Row</Button>
                    <TableContainer >
                        <Table>
                            <TableBody>
                                {formData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            {/* <TextField
                                                value={row.costcenter}
                                                placeholder='Cost Center'
                                                onChange={(event) => handleChange(index, 'costcenter', event)}
                                                error={errors[index]?.costcenter}
                                                helperText={errors[index]?.costcenter ? 'Required' : ''}
                                                size='small'
                                                type='text'
                                            /> */}
                                            <TextField
                                                id="companycode"
                                                select
                                                value={row.Kostl}
                                                // placeholder='Cost Center'
                                                label='Cost Center'
                                                onChange={(event) => handleChange(index, 'Kostl', event)}
                                                error={errors[index]?.Kostl}
                                                size='small'
                                                style={{ width: '150px' }}
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
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={row.expense}
                                                // placeholder='Expense'
                                                label='Expense'
                                                onChange={(event) => handleChange(index, 'expense', event)}
                                                error={errors[index]?.expense}
                                                // helperText={errors[index]?.expense ? 'Required' : ''}
                                                size='small'
                                                type='text'
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                id="Waers"
                                                select
                                                value={row.Waers}
                                                // placeholder='Currency'
                                                label='Currency'
                                                onChange={(event) => handleChange(index, 'Waers', event)}
                                                error={errors[index]?.Waers}
                                                size='small'
                                                style={{ width: '110px' }}
                                            >
                                                {Waers.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label} ({option.value})
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={row.Dmbtr}
                                                // placeholder='Amount'
                                                label='Amount'
                                                onChange={(event) => handleChange(index, 'Dmbtr', event)}
                                                error={errors[index]?.Dmbtr}
                                                // helperText={errors[index]?.Dmbtr ? 'Required' : ''}
                                                size='small'
                                                type='number'
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={row.DmbtrR}
                                                placeholder='Requested'
                                                label='Requested'
                                                onChange={(event) => handleChange(index, 'DmbtrR', event)}
                                                error={errors[index]?.DmbtrR}
                                                // helperText={errors[index]?.DmbtrR ? 'Required' : ''}
                                                size='small'
                                                type='number'
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDeleteRow(index)} >
                                                <FaMinus />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseExpense} color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            {/* add expenses pop-up */}

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert icon={<MdOutlineCopyAll />} onClose={handleSnackbarClose} severity="warning" sx={{ width: '100%' }}>
                    Selected IDs copied to clipboard!
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Expense;