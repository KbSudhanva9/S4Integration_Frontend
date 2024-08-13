import React, { useState } from 'react';
import { FaMinus } from "react-icons/fa6";

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

const CustomizedDialogs = () => {
  const [openAddExpense, setOpenAddExpense] = useState(false);
  const [id, setId] = useState(1);
  const [formData, setFormData] = useState([]);

  const handleClickOpen = () => {
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
  }

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

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog open={openAddExpense} onClose={handleCloseExpense}>
        <DialogTitle>Input Table</DialogTitle>
        <DialogContent dividers>
          <Button onClick={addRow}>Add</Button>
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
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={row.expense}
                          placeholder='Expense'
                          onChange={(event) => handleChange(index, 'expense', event)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={row.amount}
                          placeholder='Amount'
                          onChange={(event) => handleChange(index, 'amount', event)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          value={row.requested} 
                          placeholder='Requested'
                          onChange={(event) => handleChange(index, 'requested', event)}
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
            <Button onClick={handleCloseExpense} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomizedDialogs;
