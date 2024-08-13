import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

const Travel = () => {

    const [tdata, setTData] = useState([]);
    const columns = [
        { field: 'sap_document_no', headerName: 'SAPDocument No.', width: 170 },
        { field: 'requested_date', headerName: 'Requested Date', width: 150 },
        { field: 'approved_date', headerName: 'Approved Date', width: 150 },
        { field: 'request_details', headerName: 'Request Details', width: 170 },
        { field: 'request_text', headerName: 'Request Text', width: 120 },
        { field: 'amount_status', headerName: 'Amount Status', width: 140 },
        
        // { field: 'amnt', headerName: 'Amount', width: 100 },
        // { field: 'status', headerName: 'Status', width: 130 },
        // { field: 'approved_rejected', headerName: 'Appr/Rej', width: 110 },
        // { field: 'Remarks', headerName: 'Remarks', width: 140 },
    ];

    return (
        <div className="maincomponent" style={{height: '85vh'}}>
            {/* Travel */}
            <DataGrid
                rows={tdata}
                columns={columns}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 5 },
                //     },
                // }}
                // pageSizeOptions={[5, 10]}
            // checkboxSelection
            // onRowSelectionModelChange={handleSelectionChange}
            />
        </div>
    );
}

export default Travel;