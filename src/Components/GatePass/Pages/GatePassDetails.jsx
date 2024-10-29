import { Box, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextareaAutosize, TextField, Tooltip } from '@mui/material';
import './GatePass.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../Utils/ApiCalls/Api';
import FullScreenLoader from '../../../Utils/Loading/FullScreenLoader';
import { TbNotesOff } from 'react-icons/tb';

const GatePassDetails = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [gatePassHeader, setGatePassHeader] = useState([]);
    const [gatePassHeaderAddr, setGatePassHeaderAddr] = useState([]);

    const sampleData = [
        {
            SalesOrderNumber: "SO12345",
            OrderDate: "2024-09-15",
            Total_amount: 1500.75,
        },
        {
            SalesOrderNumber: "SO67890",
            OrderDate: "2024-10-01",
            Total_amount: 2500.50,
        },
        {
            SalesOrderNumber: "SO11223",
            OrderDate: "2024-08-25",
            Total_amount: 1750.00,
        },
    ];

    const [itemsTdata, setItemsTdata] = useState(sampleData);

    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlePostData = async (url, body) => {
        var currentURL = `${import.meta.env.VITE_BASE_URL}` + url;
        try {
            const response = await api.post(currentURL, body, {
                // headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('getGatePassHeaderAddr')) {
                console.log(response.data.data.results);
                setGatePassHeaderAddr(response.data.data.results[0]);
                setLoading(false);
            } else if (url.includes('getGatePassHeader')) {
                console.log(response.data.data);
                setGatePassHeader(response.data.data);
                setLoading(false);

            } else if (url.includes('getGatePassHeaderItems')) {
                console.log(response);
                // setGatePassHeader(response.data.data);
                setLoading(false);
            }
        } catch (error) {
            console.error('unable to get the response', error);
            setLoading(false);
        }
    };

    const handleGetHeaderData = () => {
        setLoading(true);
        const body = { "Gpno": `${localStorage.getItem('Gpno')}` }
        const url = '/sap/gatepass/getGatePassHeader';
        handlePostData(url, body);
    }

    const handleGetHeaderDataAddr = () => {
        setLoading(true);
        const body = { "Gpno": `${localStorage.getItem('Gpno')}` }
        const url = '/sap/gatepass/getGatePassHeaderAddr';
        handlePostData(url, body);
    }

    const handleGetHeaderDataItems = () => {
        setLoading(true);
        const body = { "Gpno": `${localStorage.getItem('Gpno')}` }
        const url = '/sap/gatepass/getGatePassHeaderItems';
        handlePostData(url, body);
    }

    const NoRowsOverlay = () => (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
            }}
        >
            <TbNotesOff size={60} color="gray" />
            <span style={{ marginTop: "8px", color: "gray" }}>No Rows Added</span>
        </div>
    );

    useEffect(() => {
        // console.log("asdf");
        handleGetHeaderData();
        handleGetHeaderDataAddr();
        handleGetHeaderDataItems();
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('Gpno')) {
            navigate('/gate-pass')
        }
    })

    return (
        <>
            {loading && <FullScreenLoader />}
            <div>
                <div className="flx-wrap" style={{ backgroundColor: '#fff', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', }}>
                    <div className='df' style={{ padding: '5px' }}>{/*style={{margin: '0px 5px 0px 5px'}}*/}
                        <p className='ppadding'>Created By: </p>
                        {/* <input size={"small"}></input> */}
                        <TextField disabled value={gatePassHeader.Reluser} size='small' style={{ width: "160px" }} />
                    </div>
                    <div className='df' style={{ padding: '5px' }}>
                        <p className='ppadding'>Out for: </p>
                        <TextField disabled value={gatePassHeader.RefdpctypeTxt} size='small' style={{ width: "190px" }} />
                        {/* <Tooltip title={gatePassHeader.RefdpctypeTxt || ""} arrow placement="bottom">
                            <TextField disable value={gatePassHeader.RefdpctypeTxt} size="small" style={{ width: "190px" }} />
                        </Tooltip> */}
                    </div>
                    <div className='df' style={{ padding: '5px' }}>
                        <p className='ppadding'>Partner: </p>
                        <TextField disabled value={""} size='small' style={{ width: "165px" }} />
                    </div>
                    <div className='df' style={{ padding: '5px' }}>
                        <p className='ppadding'>Status: </p>
                        <TextField disabled value={gatePassHeader.Gpstatus} size='small' style={{ width: "165px" }} />
                    </div>
                </div>
                <div className='maincomponent'>
                    {/* <p className='ppadding'><b>Vendor Details</b></p> */}
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between", // Adjust spacing between divs
                            gap: "10px", // Optional: Add space between divs
                        }}
                    >
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', margin: '5px 0px 0px 0px' }}><b>Vendor Details</b></p>
                            <div style={{ padding: '5px' }}>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Code & GST No: </p>
                                    <TextField disabled value={gatePassHeaderAddr.Lifnr} size='small' style={{ width: '120px', paddingRight: '5px' }} />
                                    <TextField disabled value={gatePassHeaderAddr.Stcd3} size='small' style={{ width: '120px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Vendor Name: </p>
                                    <TextField disabled value={gatePassHeaderAddr.Buname} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>House & Street No: </p>
                                    <TextField disabled multiline rows={2} value={gatePassHeaderAddr.Stras} style={{ width: '245px', }} size='small' />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>City & Postal Code: </p>
                                    <TextField disabled value={gatePassHeaderAddr.Ort01} size='small' style={{ width: '120px', paddingRight: '5px' }} />
                                    <TextField disabled value={gatePassHeaderAddr.Pstlz} size='small' style={{ width: '120px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>State & Country: </p>
                                    <TextField disabled value={gatePassHeaderAddr.State} size='small' style={{ width: '120px', paddingRight: '5px' }} />
                                    <TextField disabled value={gatePassHeaderAddr.Landx} size='small' style={{ width: '120px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Phone No: </p>
                                    <TextField disabled value={""} style={{ width: '245px', }} size='small' />
                                </div>

                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', margin: '5px 0px 0px 0px' }}><b>Driver Details</b></p>
                            <div style={{ padding: '5px' }}>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Driver Name: </p>
                                    <TextField disabled value={gatePassHeader.Drivername} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Driver Mobile No: </p>
                                    <TextField disabled value={gatePassHeader.Drivermobno} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Driver License No: </p>
                                    <TextField disabled value={gatePassHeader.Driverdlno} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>No of People Entry: </p>
                                    <TextField disabled value={gatePassHeader.Nopersonentry} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Comments: </p>
                                    <TextField disabled multiline rows={3} style={{ width: '245px', }} value={gatePassHeader.Comments} size='small' />
                                </div>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '15px', margin: '5px 0px 0px 0px' }}><b>Vechicle Details</b></p>
                            <div style={{ padding: '5px' }}>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Mode of Transport: </p>
                                    <TextField disabled value={gatePassHeader.Modeoftr} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Vechicle No: </p>
                                    <TextField disabled value={gatePassHeader.Vehno} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Vechicle Type: </p>
                                    <TextField disabled value={gatePassHeader.Vehtype} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Vechicle Total Weight: </p>
                                    <TextField disabled value={gatePassHeader.Totalweight} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Vechicle Tare Weight: </p>
                                    <TextField disabled value={gatePassHeader.Tareweight} size='small' style={{ width: '245px', }} />
                                </div>
                                <div className='df padding-top-bottom'>
                                    <p className='ppadding details-font-size'>Items Weight: </p>
                                    <TextField disabled value={gatePassHeader.Itemsweight} size='small' style={{ width: '245px', }} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className='maincomponent'>
                    <Box >
                        <Tabs value={value} onChange={handleTabChange} >
                            <Tab label="Items" />
                            <Tab label="Address" />
                            <Tab label="Entry Details" />

                            {value === 0 && (
                                itemsTdata.length > 0 ? (
                                    <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                                        <Table size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Sales Order Number</TableCell>
                                                    <TableCell>Order Date</TableCell>
                                                    <TableCell>Total Amount</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {itemsTdata.map((row, index) => (
                                                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                        <TableCell component="th" scope="row">
                                                            {row.SalesOrderNumber}
                                                        </TableCell>
                                                        <TableCell>{row.OrderDate}</TableCell>
                                                        <TableCell>{row.Total_amount}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <div style={{ textAlign: 'center', padding: '20px', color: 'gray' }}>
                                        No data available
                                    </div>
                                )
                            )}
                        </Tabs>
                    </Box>
                </div>

            </div>
        </>
    )

}

export default GatePassDetails;