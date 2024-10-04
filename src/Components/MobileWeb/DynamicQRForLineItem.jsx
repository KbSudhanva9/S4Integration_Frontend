import { Button, TextField } from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import './QR.css'

const DynamicQRForLineItem = ({ value, setQr, invno }) => {


    return (
        <div className="qr-screen">

            <div style={{ backgroundColor: '#fff', padding: '30px 20px 0px 20px', borderRadius: '5px' }}>

                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <QRCode style={{ height: "200px", width: "200px" }} value={value} />
                </div>

                <div style={{ padding: '10px 20px 20px 20px', display: 'flex', justifyContent: 'space-around' }}>
                    {/* <Button color="error" variant="outlined"> */}
                    <p style={{ margin: 0, padding: '10px' }}>{invno}</p>
                    <Button color="warning" size="small" variant="outlined" onClick={() => setQr(false)}>
                        close
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default DynamicQRForLineItem;


