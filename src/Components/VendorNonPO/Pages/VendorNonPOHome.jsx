import { Avatar, Box, Card, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import { IoFileTrayFull } from "react-icons/io5";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuClipboardCheck } from "react-icons/lu";
import { TbFileDollar } from "react-icons/tb";
import { TbDeviceIpadCheck } from "react-icons/tb";

import { useSelector } from "react-redux";

const VendorNonPOHome = () => {

    const [cardData, setCardData] = useState([]);
    const [dataset, setDataset] = useState([]);
    const { token, user } = useSelector((state) => state.auth);

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
                                    // subheader={cardData.tot}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {/* {cardData.total_po} */}
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
                                    // subheader={cardData.open_amt}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {/* {cardData.open_po} */}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                        {/* <Card style={{ margin: '15px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#c6fff9', width: 56, height: 56 }} variant="rounded">
                                            <TbFileDollar  style={{ color: '#007783' }} />
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
                        </Card> */}
                        <Card style={{ margin: '15px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#cbead7', width: 56, height: 56 }} variant="rounded">
                                            <LuClipboardCheck style={{ color: '#007c49' }} />
                                        </Avatar>
                                    }
                                    title="Payment Cleared"
                                    // subheader={cardData.paid}
                                />
                                <Box sx={{ textAlign: 'right', marginRight: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        {/* {cardData.po_clrd} */}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>

                    </div>
                </div>
                {/* <div className='three'>
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
                </div> */}
                {/* <div className='three'>
                    <Card style={{ margin: '37px 10px 0px 0px', padding: '50px 0px 35px 0px', backgroundColor: '#fff', borderRadius: '8px' }}>
                        <center><Typography>Monthly Amount</Typography></center>
                        <BarChart
                            dataset={dataset}
                            xAxis={[
                                { scaleType: 'band', dataKey: 'month' },
                            ]}
                            {...chartSetting}
                        />
                        <BarChart
                            dataset={dataset.map(item => ({ ...item, month: monthNames[parseInt(item.month) - 1], }))}
                            xAxis={[{ scaleType: 'band', dataKey: 'month' },]}
                            {...chartSetting}
                        />
                    </Card>
                </div> */}
            </div>
        </div>
     );
}
 
export default VendorNonPOHome;