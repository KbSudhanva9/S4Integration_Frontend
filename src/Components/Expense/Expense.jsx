import React, { useState } from 'react'
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

const Expense = () => {

    // const data = [
    //     { id: 1, costcenter: "234490", expense: "Office & Other Supplies", amount: '$89.09', requested: '89.09' }
    // ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'costcenter', headerName: 'Cost Center', width: 130 },
        { field: 'expense', headerName: 'Expense', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'requested', headerName: 'Requested', width: 130 },
    ];

    const [tdata, setTData] = useState([]);                 //table data
    const [submitExp, setSubmitExp] = useState([]);         //store selected row id's tdata
    const [sRows, setSRows] = useState([]);                 //store selected data in table tdata
    const [id, setId] = useState(1);                        //auto increment for id in tdata
    const [formData, setFormData] = useState([]);           //pop-up table row data
    const [openAddExpense, setOpenAddExpense] = useState(false);    //pop-up open/close
    const [errors, setErrors] = useState([]);               //handeling pop-up error
    const [snackbarOpen, setSnackbarOpen] = useState(false);        //for copy display snackbar

    // on selecting or un-selecting the rows in table live change
    const handleSelectionChange = (selection) => {
        setSubmitExp(selection); 
        const selectedData = selection.map(id => tdata.find(row => row.id === id));
        // console.log(selectedData);
        setSRows(selectedData);
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
        let pData = { id: id, costcenter: '', expense: '', amount: '', requested: '' };
        setFormData((preData) => [...preData, pData]);
        setErrors([...errors, { costcenter: false, expense: false, amount: false, requested: false }]);
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
              costcenter: row.costcenter === '',
              expense: row.expense === '',
              amount: row.amount === '',
              requested: row.requested === '',
            };
          });
      
          const hasErrors = newErrors.some(row => Object.values(row).some(error => error));
      
          if (hasErrors) {
            setErrors(newErrors);
          } else {
            setTData( [ ...tdata, ...formData ] );
            setFormData([{ costcenter: '', expense: '', amount: '', requested: '' }]); // Reset formData after submit
            setErrors([{ costcenter: false, expense: false, amount: false, requested: false }]);
            handleCloseExpense();
        }
    };


    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setSnackbarOpen(false);
      };
    

    const copySeletedRowsIds =()=>{
        const ids = sRows.map(item => `${item.id}`).join(', ');
        const copyIds = 'ID : '+ ids;
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

    const submitExpense =()=>{
        console.log(tdata);
    }


    const companycode = [
        {
          value: '1000',
          label: '1000',
        },
        {
          value: '2000',
          label: '2000',
        }
    ];

    return (
        <div className='maincomponent'>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Company Code</p>
                    <TextField
                        id="companycode"
                        select
                        size='small'
                        style={{width:'221px'}}
                        >
                        {companycode.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div className='basic-margin'>
                    <p>Document type</p>
                    <TextField size='small'/>
                </div>
                <div className='basic-margin'>
                    <p>Document Date</p>
                    <input className='date' type='date' style={{width:'221px'}} />
                </div>
            </div>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Refrence Number</p>
                    <TextField size='small'/>
                </div>
                <div className='basic-margin'>
                    <p>Document Header Text</p>
                    <TextField size='small'/>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'end', margin: '10px'}}>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<MdOutlinePostAdd />} onClick={handleClickOpenExpense}>Add</Button>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<MdOutlineCopyAll />} color='warning' onClick={copySeletedRowsIds}>Copy</Button>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<MdOutlineDeleteOutline />} color="error" onClick={deleteSelected}>Delete</Button>
            </div>
            {/* table */}
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
                        checkboxSelection
                        onRowSelectionModelChange={handleSelectionChange}
                    />
                </div>
            </div>
            {/* table */}
            <div style={{display: 'flex', justifyContent: 'end', margin: '10px'}}>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<RiShare2Fill />} onClick={submitExpense}>Submit Expense</Button>
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
                                <TextField
                                value={row.costcenter}
                                placeholder='Cost Center'
                                onChange={(event) => handleChange(index, 'costcenter', event)}
                                error={errors[index]?.costcenter}
                                helperText={errors[index]?.costcenter ? 'Required' : ''}
                                size='small'
                                type='text'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                value={row.expense}
                                placeholder='Expense'
                                onChange={(event) => handleChange(index, 'expense', event)}
                                error={errors[index]?.expense}
                                helperText={errors[index]?.expense ? 'Required' : ''}
                                size='small'
                                type='text'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                value={row.amount}
                                placeholder='Amount'
                                onChange={(event) => handleChange(index, 'amount', event)}
                                error={errors[index]?.amount}
                                helperText={errors[index]?.amount ? 'Required' : ''}
                                size='small'
                                type='number'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                value={row.requested} 
                                placeholder='Requested'
                                onChange={(event) => handleChange(index, 'requested', event)}
                                error={errors[index]?.requested}
                                helperText={errors[index]?.requested ? 'Required' : ''}
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