import { Outlet } from "react-router-dom";
import VendorNonPOHeader from "./VendorNonPOHeader";

const VendorNonPOMainPage = () => {
    return ( 
        <>
            <VendorNonPOHeader />
            <div style={{margin: '8px', padding: '10px', borderRadius: '8px'}}>
                <Outlet />
            </div>
        </>
     );
}
 
export default VendorNonPOMainPage;