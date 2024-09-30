import { TextField } from "@mui/material";
import { useState } from "react";
import QRCode from "react-qr-code";

const QRTestOne = () => {

    const [value, setValue] = useState('https://s4hanaintegrationui.netlify.app/vendor-onbording-login');

    return (
        <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>

            {/* <TextField value={value} onChange={(e) => setValue(e.target.value)} /> */}

            <div style={{ width: '300px', height: '300px', backgroundColor: '#ccc', display: 'grid', placeItems: 'center' }}>
                {/* hello */}



                <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={value}
                    viewBox={`0 0 256 256`}
                />
            </div>
        </div>
    );
}

export default QRTestOne;