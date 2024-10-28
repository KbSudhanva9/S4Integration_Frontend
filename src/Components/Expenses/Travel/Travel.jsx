import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../../../Utils/ApiCalls/Api";
import { Box, CircularProgress, styled } from "@mui/material";
import { TbNotesOff } from "react-icons/tb";
import { FaList, FaTimesCircle } from "react-icons/fa";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../Utils/FireBase/FireBaseConfig";
import { IoDocumentAttachOutline } from "react-icons/io5";
import FullScreenLoader from "../../../Utils/Loading/FullScreenLoader";
// import FireBaseConfig from "../../../Utils/FireBase/FireBaseConfig"

const Travel = () => {

    const [tdata, setTData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fullLoading, setFullLoading] = useState(false);
    const email = localStorage.getItem('email');

    const columns = [
        { field: 'Docno', headerName: 'SAPDocument No.', width: 170 },
        { field: 'Bldat', headerName: 'Requested Date', width: 140 },
        { field: 'Budat', headerName: 'Approved Date', width: 140 },
        { field: 'Xblnr', headerName: 'Request Details', width: 160 },
        { field: 'Bktxt', headerName: 'Request Text', width: 120 },
        { field: 'Dmbtr', headerName: 'Amount', width: 130 },
        { field: 'Tflag', headerName: 'Status', width: 90 },
        // { field: 'docTime', headerName: 'Document', width: 150 },
        {
            field: 'docTime',
            headerName: 'Document',
            width: 100,
            renderCell: (params) => (
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => handleDocumentClick(params.row.docTime)} // Call function to fetch document
                >
                    {/* {params.row.docTime} */}
                    <IoDocumentAttachOutline style={{ height: '20px', width: '20px' }} />

                </span>
            )
        },
        { field: 'Remarks', headerName: 'Remarks', width: 210 },
    ];

    // const handleDocumentClick = async (docNumber) => {
    //     try {
    //       const storageRef = ref(storage, `images/${docNumber}`); // Search document by docNumber
    //       const downloadURL = await getDownloadURL(storageRef);
    //       window.open(downloadURL, "_blank"); // Open the document in a new tab
    //     } catch (error) {
    //       console.error("Error fetching document from Firebase:", error);
    //       alert("Unable to find the document.");
    //     }
    //   };
    const handleDocumentClick = async (docNumber) => {
        setFullLoading(true);
        try {
            const storageRef = ref(storage, `images/${docNumber}`); // Use docNumber to reference the file in Firebase storage
            const downloadURL = await getDownloadURL(storageRef);   // Fetch download URL from Firebase
            window.open(downloadURL, "_blank"); // Open the document in a new tab
            setFullLoading(false);
        } catch (error) {
            console.error("Error fetching document from Firebase:", error);
            alert("Unable to find the document.");
            setFullLoading(false);
        }
    };

    // If date is like /Date(1234567890)/"
    // const convertDate = (dateString) => {
    //     // Extract the timestamp from the date string
    //     const timestamp = parseInt(dateString.match(/\/Date\((\d+)\)\//)[1], 10);

    //     // Convert the timestamp to a Date object
    //     const date = new Date(timestamp);

    //     // Format the date as needed (e.g., yyyy-MM-dd)
    //     const formattedDate = date.toISOString().slice(0, 10);

    //     return formattedDate;
    // };

    // date is like yyyyMMdd to yyyy-mm-dd
    const convertDate = (dateString) => {
        if (!dateString || dateString.length !== 8) {
            return ''; // Return an empty string if date is invalid or not in the expected format
        }

        // Extract year, month, and day from the string
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);

        // Return in the format yyyy-MM-dd
        return `${year}-${month}-${day}`;
    };

    const handleGetData = async (url) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.get(currentURL);
            if (url.includes('getAllExpense')) {
                console.log(response);

                const formattedLineItems = response.data.data.results
                    .filter(item => item.Smtpadr === email)
                    .map((item, index) => ({
                        id: index + 1,
                        Docno: item.Docno,
                        Bldat: convertDate(item.Bldat),
                        Budat: convertDate(item.Budat),
                        Xblnr: item.Xblnr,
                        Bktxt: item.Bktxt,
                        Dmbtr: item.Dmbtr,
                        Tflag: item.Tflag,
                        docTime: item.docTime,
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
        var url = '/public/getAllExpense';
        handleGetData(url);
    }

    const NoRowsOverlay = () => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: '8px', color: 'gray' }}>No data available</span>
        </div>
    );

    // useEffect(() => {
    //     handleTableDate();
    // }, []);

    useEffect(() => {
        // Simulate data fetching
        // setTimeout(() => {
        // Fetch your data here and set it to tdata
        // setTdata(yourFetchedData);
        handleTableDate();
        // setLoading(false); // Set loading to false when data is ready
        // }, 200); // Simulate a delay
    }, []);

    return (

        <>
            {fullLoading && <FullScreenLoader />}

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
                        <CircularProgress style={{ color: '#ea1214' }} />
                    </div>
                ) : (
                    <DataGrid
                        rows={tdata}
                        columns={columns}
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
        </>
    );
}

export default Travel;