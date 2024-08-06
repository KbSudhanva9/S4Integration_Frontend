import { Outlet } from "react-router-dom";
import MainLayout from "../Pages/MainLayout";
import VendorInvoicingHome from "./VendorInvoicingHeader";

const VendorInvoicingMainPage = () => {
    return ( 
        <div>
            <VendorInvoicingHome />
            <Outlet />
        </div>
     );
}
 
export default VendorInvoicingMainPage;