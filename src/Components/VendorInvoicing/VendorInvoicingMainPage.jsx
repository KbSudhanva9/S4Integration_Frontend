import { Outlet } from "react-router-dom";
// import MainLayout from "../Pages/MainLayout";
import VendorInvoicingHeader from "./VendorInvoicingHeader";

const VendorInvoicingMainPage = () => {
    return ( 
        <>
            <VendorInvoicingHeader />
            <div style={{margin: '8px', padding: '10px', borderRadius: '8px'}}>
                <Outlet />
            </div>
        </>
     );
}
 
export default VendorInvoicingMainPage;