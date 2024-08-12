import { Outlet } from "react-router-dom";
import ASNVendorHeader from "./ASNVendorHeader";

const ASNVendorMainPage = () => {
    return ( 
        <>
            <ASNVendorHeader />
            <div style={{margin: '8px', padding: '10px', borderRadius: '8px'}}>
                <Outlet />
            </div>
        </>
     );
}
 
export default ASNVendorMainPage;