import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../../../Utils/ApiCalls/Api";
import { CircularProgress } from "@mui/material";
import { TbNotesOff } from "react-icons/tb";

const Display = () => {

    const [tdata, setTData] = useState([]);
    const [loading, setLoading] = useState(false);
    const columns = [
        { field: 'Docno', headerName: 'SAPDocument No.', width: 170 },
        { field: 'Bldat', headerName: 'Requested Date', width: 150 },
        { field: 'Budat', headerName: 'Approved Date', width: 150 },
        { field: 'Xblnr', headerName: 'Request Details', width: 170 },
        { field: 'Bktxt', headerName: 'Request Text', width: 120 },
        { field: 'Dmbtr', headerName: 'Amount', width: 140 },
        { field: 'Tflag', headerName: 'Status', width: 100 },
        { field: 'Remarks', headerName: 'Remarks', width: 140 },
    ];

    const [cdata, setCData] = useState([]);
    const columnsDisplay = [
        { field: 'createddate', headerName: 'Created Date', width: 150 },
        { field: 'sapsono', headerName: 'SAP SO no.', width: 130 },
        { field: 'itemno', headerName: 'Item no.', width: 130 },
        { field: 'material', headerName: 'Material', width: 150 },
        { field: 'MATDescription', headerName: 'MAT Description', width: 170 },
        { field: 'quantity', headerName: 'Qty', width: 120 },
        { field: 'uom', headerName: 'UOM', width: 120 },
        { field: 'price', headerName: 'Price', width: 120 },
        { field: 'totalsoval', headerName: 'Total SO Value', width: 140 },
    ];

    const convertDate = (dateString) => {
        // Extract the timestamp from the date string
        const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);

        // Convert the timestamp to a Date object
        const date = new Date(timestamp);

        // Format the date as needed (e.g., yyyy-MM-dd)
        const formattedDate = date.toISOString().slice(0, 10);

        return formattedDate;
    };

    const handleGetData = async (url) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL);
            if (url.includes('tableData')) {

                console.log(response);

                const formattedLineItems = response.data.data.results.map((item, index) => ({
                    id: index + 1,
                    Docno: item.Docno,
                    Bldat: convertDate(item.Bldat),
                    Budat: convertDate(item.Budat),
                    Xblnr: item.Xblnr,
                    Bktxt: item.Bktxt,
                    Dmbtr: item.Dmbtr,
                    Tflag: item.Tflag,
                    Remarks: item.Remarks,
                    // approvedOrRejected: item.approvedOrRejected,
                    // remarks: item.remarks,
                }));
                setTData(formattedLineItems);

                setLoading(false);
            }
        } catch (error) {
            console.error('unable to get the response', error);
            setLoading(false);
        }
    };

    const handleTableDate = () => {
        setLoading(true);
        var url = '/public/tableData';
        handleGetData(url);
    }

    // useEffect(() => {
    //     handleTableDate();
    // }, []);

    const NoRowsOverlay = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: '8px', color: 'gray' }}>No data available</span>
        </div>
    );

    useEffect(() => {
        // handleTableDate();


        // Simulate data fetching
        // setTimeout(() => {
            // Fetch your data here and set it to tdata
            // setTdata(yourFetchedData);
            // handleTableDate();
            // setLoading(false); // Set loading to false when data is ready
        // }, 200); // Simulate a delay
    }, []);

    return (
        <div className="maincomponent" style={{ height: '85vh' }}>
            {/* Travel */}
            {loading ? (
                <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1100
                }}>
                    <CircularProgress style={{color: '#ea1214'}} />
                </div>
            ) : (
                <DataGrid
                    rows={cdata}
                    columns={columnsDisplay}
                    slots={{ noRowsOverlay: NoRowsOverlay }}
                // initialState={{
                //     pagination: {
                //         paginationModel: { page: 0, pageSize: 5 },
                //     },
                // }}
                // pageSizeOptions={[5, 10]}
                // checkboxSelection
                // onRowSelectionModelChange={handleSelectionChange}
                />
            )}
        </div>
    );
}

export default Display;