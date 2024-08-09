import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoFileTrayFull } from "react-icons/io5";
import { TbFileDollar } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClipboardCheck } from "react-icons/lu";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import './VendorInvoicing.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import api from "../../../Utils/ApiCalls/Api"
import { setEmail } from '../ReduxAuth';

const VendorInvoicingHome = () => {

    const dispatch = useDispatch();

    const [cardData, setCardData] = useState([]);
    const [dataset, setDataset] = useState([]);
    const { token, user } = useSelector((state) => state.auth);
    // const valueFormatter = (value) => `${value}mm`;

    // const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const transformedData = dataset.map((item, index) => ({
        name: monthNames[parseInt(item.month) - 1],  // Convert month number to month name
        value: parseFloat(item.amount),              // Convert amount to a number
        // color: colors[index],                        // Assign color from the array
    }));

    useEffect(() => {
        handleCardData();
        handleChartData();
    }, []);

    useEffect(() => {
        // console.log(cardData);
        // console.log(dataset);
    }, [cardData, dataset]);

    const handleGetData = async (url) => {

        if(localStorage.getItem('email')){
            localStorage.removeItem('email');
        }


        const statusSearchURL = `${import.meta.env.VITE_BASE_URL}` + url;

        try {
            const response = await api.get(statusSearchURL, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (url.includes('poValues')) {
                setCardData(response.data.data);

                // console.log(response.data.data.email)
                localStorage.setItem('email', response.data.data.email);
                // dispatch(setEmail({
                //     email: response.data.email
                // }));

            } else if (url.includes('dashboard')) {
                setDataset(response.data.data.results);
            }

        } catch (error) {
            console.log('Search failed', error);
        }
    };

    const handleCardData = () => {
        var url = '/sap/vim/poValues';
        handleGetData(url);
    }
    const handleChartData = () => {
        var url = '/sap/vim/dashboard';
        handleGetData(url);
    }




    const chartSetting = {
        series: [{ dataKey: 'amount', label: 'Month Data' }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

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
                                            <IoFileTrayFull style={{ color: '#c75f00' }} />
                                        </Avatar>
                                    }
                                    title="Total PO Value"
                                    subheader={cardData.tot}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardData.total_po}
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
                                    title="Open PO Balance"
                                    subheader={cardData.open_amt}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardData.open_po}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        <Card style={{ margin: '15px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#c6fff9', width: 56, height: 56 }} variant="rounded">
                                            <TbFileDollar style={{ color: '#007783' }} />
                                        </Avatar>
                                    }
                                    title="Invoice Created"
                                    subheader={cardData.cret}
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
                                        <Avatar sx={{ bgcolor: '#cbead7', width: 56, height: 56 }} variant="rounded">
                                            <LuClipboardCheck style={{ color: '#007c49' }} />
                                        </Avatar>
                                    }
                                    title="Payment Cleared"
                                    subheader={cardData.paid}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {cardData.po_clrd}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>

                    </div>
                </div>
                <div className='three'>
                    <Card style={{ margin: '37px 10px 0px 10px', padding: '80px 0px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <center><Typography>Monthly Count</Typography></center>
                        <PieChart
                            style={{ margin: '15px' }}
                            series={[
                                {
                                    data: transformedData.map((item) => ({
                                        name: item.name,
                                        value: item.value,
                                        // color: item.color,
                                        label: item.name,
                                    })),
                                    innerRadius: 45,
                                    outerRadius: 90,
                                    paddingAngle: 0.1,
                                    cornerRadius: 4,
                                    startAngle: 0,
                                    endAngle: 360,
                                    cx: 110,
                                    cy: 100,
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </Card>
                </div>
                <div className='three'>
                    <Card style={{ margin: '37px 10px 0px 0px', padding: '50px 0px 35px 0px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <center><Typography>Monthly Amount</Typography></center>
                        {/* <BarChart
                            dataset={dataset}
                            xAxis={[
                                { scaleType: 'band', dataKey: 'month' },
                            ]}
                            {...chartSetting}
                        /> */}
                        <BarChart
                            dataset={dataset.map(item => ({ ...item, month: monthNames[parseInt(item.month) - 1], }))}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' },]}
                            {...chartSetting}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default VendorInvoicingHome;