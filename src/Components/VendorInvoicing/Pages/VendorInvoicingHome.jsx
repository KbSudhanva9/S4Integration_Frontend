import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoFileTrayFull } from "react-icons/io5";
import { TbFileDollar } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClipboardCheck } from "react-icons/lu";

// import { PieChart } from '@mui/x-charts/PieChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';


import './VendorInvoicing.css'
import { useSelector } from 'react-redux';

const VendorInvoicingHome = () => {

    const {token, user} = useSelector((state)=>state.auth);
    const valueFormatter = (value) => `${value}mm`;

    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
    ];

    const chartSetting = {
        // yAxis: [
        //     {
        //         label: 'rainfall (mm)',
        //     },
        // ],
        series: [{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    const dataset = [
        { london: 59, paris: 57, newYork: 86, seoul: 21, month: 'Jan', },
        { london: 50, paris: 52, newYork: 78, seoul: 28, month: 'Feb', },
        { london: 47, paris: 53, newYork: 106, seoul: 41, month: 'Mar', },
        { london: 54, paris: 56, newYork: 92, seoul: 73, month: 'Apr', },
        { london: 57, paris: 69, newYork: 92, seoul: 99, month: 'May', },
        { london: 60, paris: 63, newYork: 103, seoul: 144, month: 'June', },
        { london: 59, paris: 60, newYork: 105, seoul: 319, month: 'July', },
        { london: 65, paris: 60, newYork: 106, seoul: 249, month: 'Aug', },
        { london: 51, paris: 51, newYork: 95, seoul: 131, month: 'Sept', },
        { london: 60, paris: 65, newYork: 97, seoul: 55, month: 'Oct', },
        { london: 67, paris: 64, newYork: 76, seoul: 48, month: 'Nov', },
        { london: 61, paris: 70, newYork: 103, seoul: 25, month: 'Dec', },
    ];

    return (
        <div>
            <div>
                <p style={{margin: '0px'}}>Vendor : {user}</p> 
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
                                    subheader="1263916.90"
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        123123
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
                                    subheader="1263916.90"
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        123123
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
                                    subheader="1263916.90"
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        123123
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
                                    subheader="1263916.90"
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        123123
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
                                    data: [
                                        { id: 1, value: 10, label: 'JAN' },
                                        { id: 2, value: 15, label: 'FEB' },
                                        { id: 3, value: 30, label: 'MAR' },
                                        { id: 4, value: 200, label: 'APR' },
                                        { id: 5, value: 25, label: 'MAY' },
                                        { id: 6, value: 23, label: 'JUN' },
                                        { id: 7, value: 12, label: 'JUL' },
                                        { id: 8, value: 9, label: 'AUG' },
                                        { id: 9, value: 0, label: 'SEP' },
                                        { id: 10, value: 32, label: 'OCT' },
                                        { id: 11, value: 18, label: 'NOV' },
                                        { id: 12, value: 21, label: 'DEC' }
                                    ],
                                    // colors: colors},
                                    innerRadius: 10,
                                    outerRadius: 90,
                                    paddingAngle: 1,
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
                            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
                            layout="horizontal"
                            grid={{ vertical: true }}
                            {...chartSetting}
                        /> */}
                        <BarChart
                            dataset={dataset}
                            xAxis={[
                                { scaleType: 'band', dataKey: 'month' },
                            ]}
                            {...chartSetting}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default VendorInvoicingHome;