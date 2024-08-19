import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IoFileTrayFull } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClipboardCheck } from "react-icons/lu";
import { TbFileDollar } from "react-icons/tb";
import { TbDeviceIpadCheck } from "react-icons/tb";

import { useSelector } from "react-redux";
import api from "../../../Utils/ApiCalls/Api";
import { axisClasses, BarChart } from "@mui/x-charts";

const VendorNonPOHome = () => {

    const [cardData, setCardData] = useState([]);
    const [dataset, setDataset] = useState([]);
    const { token, user } = useSelector((state) => state.auth);

    const handleGetData = async (url) => {

        if (localStorage.getItem('email')) {
            localStorage.removeItem('email');
        }

        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;

        try {
            const response = await api.get(statusSearchURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('headData')) {
                setCardData(response.data.data);
            } else if (url.includes('dashboardGraph')) {
                setDataset(response.data.data.results);
                // console.log(response.data.data);
            }
        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handleCardData = () => {
        var url = '/sap/nonpo/headData';
        handleGetData(url);
    }
    const handleGraphData = () => {
        var url = '/sap/nonpo/dashboardGraph';
        handleGetData(url);
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    // const transformedData = dataset.map((item, index) => ({
    //     name: monthNames[parseInt(item.month) - 1],  // Convert month number to month name
    //     value: parseFloat(item.amount),              // Convert amount to a number
    //     // color: colors[index],                        // Assign color from the array
    // }));

    const chartSetting = {
        series: [{ dataKey: 'amount', label: 'Month Data' }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    useEffect(() => {
        handleCardData();
        handleGraphData();
    }, [])

    return (
        <div>
            <div>
                <p style={{ margin: '0px' }}>Vendor : {user}</p>
            </div>
            <div className='df' style={{ width: '100%' }}>
                <div className='three'>
                    <div style={{ padding: '20px 0px 0px 0px' }}>
                        <Card style={{ margin: '15px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#fff1b8', width: 56, height: 56 }} variant="rounded">
                                            <TbDeviceIpadCheck style={{ color: '#c75f00' }} />
                                        </Avatar>
                                    }
                                    title="Invoice Created"
                                    subheader={cardData.created_amt}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardData.inv_created}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        <Card style={{ margin: '15px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#e6caee', width: 56, height: 56 }} variant="rounded">
                                            <LiaFileInvoiceDollarSolid style={{ color: '#7f2da5' }} />
                                        </Avatar>
                                    }
                                    title="Invoice Approved"
                                    subheader={cardData.approved_amt}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardData.inv_approved}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        <Card style={{ margin: '15px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#cbead7', width: 56, height: 56 }} variant="rounded">
                                            <LuClipboardCheck style={{ color: '#007c49' }} />
                                        </Avatar>
                                    }
                                    title="Payment Cleared"
                                    subheader={cardData.payment_clrd}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardData.CLEARED_AMT}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>

                    </div>
                </div>

                <div style={{width: '70%'}}>
                    <Card style={{ margin: '37px 10px 0px 0px', padding: '50px 0px 35px 0px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <center><Typography>Non-PO Monthly Amount</Typography></center>
                        <BarChart
                            dataset={dataset.map(item => ({ ...item, month: monthNames[parseInt(item.month) - 1], }))}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' },]}
                            {...chartSetting}
                            series={[
                                { dataKey: 'invCreated', label: 'invCreated' },
                                { dataKey: 'invApproved', label: 'invApproved' },
                                { dataKey: 'pmtCleared', label: 'pmtCleared' }
                              ]}
                        />
                    </Card>
                </div>
            </div>


        </div>
    );
}

export default VendorNonPOHome;