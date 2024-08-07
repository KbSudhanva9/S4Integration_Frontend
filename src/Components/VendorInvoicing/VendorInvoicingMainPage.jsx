import { Outlet } from "react-router-dom";
import MainLayout from "../Pages/MainLayout";
import VendorInvoicingHome from "./VendorInvoicingHeader";

const VendorInvoicingMainPage = () => {
    return ( 
        <>
            <VendorInvoicingHome />
            <div style={{margin: '8px', padding: '10px', borderRadius: '8px'}}>
                <Outlet />
            </div>
        </>
     );
}
 
export default VendorInvoicingMainPage;