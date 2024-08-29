
import { Children } from "react";
import SigninForm from "../Components/Auth/SigninForm";
import SignupForm from "../Components/Auth/SignupForm";
// import MainLayout from "../Components/Pages/MainLayout";
import ProtectedRoute from "./Protected.Routes";
// import Expense from "../Components/Expenses/Expense/Expense";
// import Travel from "../Components/Expenses/Travel/Travel";
import CustomizedDialogs from "../Components/Expenses/Expense/CustomizedDialogs";
import VendorOnbordingLogin from "../Components/Auth/VendorOnbording/VendorOnbordingLogin";
import VendorOnbordingSignup from "../Components/Auth/VendorOnbording/VendorOnbordingSignup";
import VendorOnbording from "../Components/VendorOnbording/VendorOnbording";
import VendorTrackStatus from "../Components/VendorOnbording/VendorTrackStatus";
import VendorInvoicingLogin from "../Components/Auth/VendorInvoicing/VendorInvoicingLogin";
import VendorInvoicingMainPage from "../Components/VendorInvoicing/VendorInvoicingMainPage";
import VendorInvoicingHome from "../Components/VendorInvoicing/Pages/VendorInvoicingHome";
import VendorInvoicingNewInvoice from "../Components/VendorInvoicing/Pages/VendorInvoicingNewInvoice";
import VendorInvoicingMyInv from "../Components/VendorInvoicing/Pages/VendorInvoicingMyInv";
import VendorInvoicingPaymentRecived from "../Components/VendorInvoicing/Pages/VendorInvoicingPaymentRecived";
import VendorInvoicingDebitCredit from "../Components/VendorInvoicing/Pages/VendorInvoicingDebitCredit";
import ASNVendorLogin from "../Components/Auth/ASNVendor/ASNVendorLogin";
import ASNVendorMainPage from "../Components/ASNVendor/ASNVendorMainPage";
import ASNVendorHome from "../Components/ASNVendor/Pages/ASNVendorHome";
import Expense from "../Components/Expenses/Expense/Expense";
import Travel from "../Components/Expenses/Travel/Travel";
import MainLayout from "../Components/Expenses/MainLayout";
import ASNVendorTrackStatus from "../Components/ASNVendor/Pages/ASNVendorTrackStatus";
import ASNVendorDetails from "../Components/ASNVendor/Pages/ASNVendorDetails";
import VendorNonPOLogin from "../Components/Auth/VendorNonPO/VendorNonPOLogin";
import VendorNonPOMainPage from "../Components/VendorNonPO/VendorNonPOMainPage";
import VendorNonPOHome from "../Components/VendorNonPO/Pages/VendorNonPOHome";
import VendorNonPOInvoiceUpload from "../Components/VendorNonPO/Pages/VendorNonPOInvoiceUpload";
import VendorNonPOInvoiceStatus from "../Components/VendorNonPO/Pages/VendorNonPOInvoiceStatus";
import OrderToCashLogin from "../Components/Auth/OrderToCash/OrderToCashLogin";
import OrderToCashMainLayout from "../Components/OrderToCash/OrderToCashMainLayout";
import Display from "../Components/OrderToCash/Pages/Display";
import Create from "../Components/OrderToCash/Pages/Create";

export const LayoutRouting = [

    // concur with main login
    {path: "", element: <SigninForm />},
    {path: "sign-up", element: <SignupForm />},
    {path: "admin", element: <ProtectedRoute element={<MainLayout />} allowedRole={['Admin']} /> ,
        children : [
            {path: "expense", element: <ProtectedRoute element={<Expense />}/>},
            {path: "travel", element: <ProtectedRoute element={<Travel />} />},
        ]
    },

    // Order to Cash 
    {path: "order-to-cash-login", element: <OrderToCashLogin />,},
    {path: "order-to-cash", element: <OrderToCashMainLayout />,
        children: [
            {path: "create", element: <Create />},
            {path: "display", element: <Display />},
            // {path: "invoice-status", element: <VendorNonPOInvoiceStatus />},
        ]
    },



    // {path: "home", element: <ProtectedRoute element={<div>User</div>} allowedRole={['user']} />},

    // vendor onbording
    {path: "vendor-onbording-login", element: <VendorOnbordingLogin />,},
    {path: "vendor-onbording", 
        children: [
            {path: "vendor-details", element: <VendorOnbording />},
        ]
    },
    {path: "vendor-onbording-sign-up", element: <VendorOnbordingSignup />},
    {path: "vendor-track-status", element: <VendorTrackStatus />},
    
    // vendor invoicing
    {path: "vendor-invoicing-login", element: <VendorInvoicingLogin />,},
    {path: "vendor-invoicing", element: <VendorInvoicingMainPage />,
        children: [
            {path: "home", element: <VendorInvoicingHome />},
            {path: "new-invoice", element: <VendorInvoicingNewInvoice />},
            {path: "my-invoice", element: <VendorInvoicingMyInv />},
            {path: "payment-received", element: <VendorInvoicingPaymentRecived />},
            {path: "debit-credit", element: <VendorInvoicingDebitCredit />},
        ]
    },


    // Advance Shipment User Vendor side
    {path: "asn-vendor-login", element: <ASNVendorLogin />,},
    {path: "asn-vendor", element: <ASNVendorMainPage />,
        children: [
            {path: "home", element: <ASNVendorHome />},
            {path: "track-status", element: <ASNVendorTrackStatus />},
            {path: "asn-details", element: <ASNVendorDetails />},
        ]
    },

    // Vendor Non-PO
    {path: "vendor-non-po-login", element: <VendorNonPOLogin />,},
    {path: "vendor-non-po", element: <VendorNonPOMainPage />,
        children: [
            {path: "home", element: <VendorNonPOHome />},
            {path: "invoice-upload", element: <VendorNonPOInvoiceUpload />},
            {path: "invoice-status", element: <VendorNonPOInvoiceStatus />},
        ]
    },
    
    
    // default wrong path
    {path: "*", element: <div>wrong url</div>},

    // tests/samples
    {path: "hello", element: <CustomizedDialogs />},
    {path: "test", element: <ProtectedRoute element={<div>Test</div>} allowedRole={['test']} />},
]