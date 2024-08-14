import { Outlet } from "react-router-dom";
import ASNVendorHeader from "./ASNVendorHeader";
import { useState } from "react";

const ASNVendorMainPage = () => {

    const [po ,setPO] = useState('');

    return ( 
        <>
            <ASNVendorHeader />
            <div style={{margin: '8px', padding: '10px', borderRadius: '8px'}}>
                <Outlet context={{po, setPO}}/>
            </div>
        </>
     );
}
 
export default ASNVendorMainPage;