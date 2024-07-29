import React, { useState } from 'react'
import './Expense.css'
import { DataGrid } from '@mui/x-data-grid';
import { MenuItem } from '@mui/material';
import { RiShare2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa6";


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
    IconButton
  } from '@mui/material';


import { MdOutlineClose } from "react-icons/md";




const Expense = () => {

    const data = [
        { id: 1, costcenter: "234490", expense: "Office & Other Supplies", amount: '$89.09', requested: '89.09' }
    ]

    

    const columns = [
        { field: 'id', headerName: 'ID', width: 130 },
        { field: 'costcenter', headerName: 'Cost Center', width: 130 },
        { field: 'expense', headerName: 'Expense', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'requested', headerName: 'Requested', width: 130 },
    ];

    const [tdata, setTData] = useState([]);
    const [submitExp, setSubmitExp] = useState([]);
    const [id, setId] = useState(1);
    const [formData, setFormData] = useState([]);

    // const addRow = () => {
    //     let pData = { id: id, costcenter: "234490", expense: "Office Supplies", amount: '$89.09', requested: '89.09' };
    //     setTData((preData) => [...preData, pData]);
    //     setId(id + 1);
    // }

    const [openAddExpense, setOpenAddExpense] = useState(false);

    const handleClickOpenExpense = () => {
        setFormData([]);
        setOpenAddExpense(true);
    };
    const handleCloseExpense = () => {
        setOpenAddExpense(false);
    };
    const addRow = () => {
        let pData = { id: id, costcenter: '', expense: '', amount: '', requested: '' };
        setFormData((preData) => [...preData, pData]);
        setId(id + 1);
    };
    const handleDeleteRow = (index) => {
        const newFormData = formData.filter((_, i) => i !== index);
        setFormData(newFormData);
    };
    const handleChange = (index, field, event) => {
        const newFormData = [...formData];
        newFormData[index][field] = event.target.value;
        setFormData(newFormData);
    };
    const handleSubmit = () => {
        console.log(JSON.stringify(formData));
        handleCloseExpense();
    };

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

    const handleSelectionChange = (selection) => {
        setSubmitExp(selection); 
        const selectedData = selection.map(id => tdata.find(row => row.id === id));
        console.log(selectedData);
    };

    const deleteSelected = () => {
        const remainingData = tdata.filter(row => !submitExp.includes(row.id));
        setTData(remainingData);
        setSubmitExp([]);
        console.log(remainingData);
    };

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
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<BiSolidEdit />} color='warning' onClick={addRow}>Edit</Button>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<MdOutlineDeleteOutline />} color="error" onClick={deleteSelected}>Delete</Button>
            </div>
            <div style={{ marginTop: '10px' }}>
                <div style={{ height: 400, width: '100%' }}>
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
            <div style={{display: 'flex', justifyContent: 'end', margin: '10px'}}>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" startIcon={<RiShare2Fill />} onClick={()=>{console.log(submitExp)}}>Submit Expense</Button>
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
            <Dialog fullWidth={true} maxWidth={'md'} open={openAddExpense} onClose={handleCloseExpense}>
                <DialogTitle>Add Expense</DialogTitle>
                <DialogContent dividers>
                <Button onClick={addRow} color='success' startIcon={<FaPlus />} >Add Row</Button>
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
                                size='small'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                value={row.expense}
                                placeholder='Expense'
                                onChange={(event) => handleChange(index, 'expense', event)}
                                size='small'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                value={row.amount}
                                placeholder='Amount'
                                onChange={(event) => handleChange(index, 'amount', event)}
                                size='small'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                value={row.requested} 
                                placeholder='Requested'
                                onChange={(event) => handleChange(index, 'requested', event)}
                                size='small'
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

        </div>
    );
}

export default Expense;