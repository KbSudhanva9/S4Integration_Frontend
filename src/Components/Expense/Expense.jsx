import { useState } from 'react'
import './Expense.css'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

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
    const [id, setId] = useState(1);

    const addRow = () => {
        let pData = { id: id, costcenter: "234490", expense: "Office Supplies", amount: '$89.09', requested: '89.09' };
        setTData((preData) => [...preData, pData]);
        setId(id + 1);
        console.log(tdata);
    }

    return (
        <div className='maincomponent'>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Dept. Code</p>
                    <input type='text' />
                </div>
                <div className='basic-margin'>
                    <p>Document type</p>
                    <input type='text' />
                </div>
                <div className='basic-margin'>
                    <p>Document Date</p>
                    <input type='date' />
                </div>
            </div>
            <div className='df'>
                <div className='basic-margin'>
                    <p>Document Number</p>
                    <input type='text' />
                </div>
                <div className='basic-margin'>
                    <p>Refrence Number</p>
                    <input type='text' />
                </div>
                <div className='basic-margin'>
                    <p>Document Header Text</p>
                    <input type='text' />
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'end', margin: '10px'}}>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" onClick={addRow}>Add</Button>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" color='warning' onClick={addRow}>Copy</Button>
                <Button style={{margin: '0px 5px'}} size="small" variant="outlined" color="error" onClick={addRow}>Delete</Button>
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
                    />
                </div>
            </div>
        </div>
    );
}

export default Expense;