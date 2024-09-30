import { Button, TextField } from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";
import './QR.css'

// const DynamicQR = () => {

//     const [value, setValue] = useState('http://hello.com');
const DynamicQR = ({ value, setQr, invno }) => {


    return (
        <div className="qr-screen">

            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '5px' }}>

                <div style={{ display: 'grid', placeItems: 'center' }}>
                    <QRCode style={{ height: "200px", width: "200px" }} value={value} />
                </div>

                <div style={{ paddingTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                    {/* <Button color="error" variant="outlined"> */}
                    <p style={{ margin: 0, fontWeight: 'bold', paddingTop: '5px' }}>{invno}</p>
                    <Button color="warning" size="small" variant="outlined" onClick={() => setQr(false)}>
                        close
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default DynamicQR;