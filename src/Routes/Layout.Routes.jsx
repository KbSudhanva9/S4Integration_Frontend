
import { Children } from "react";
import SigninForm from "../Components/Auth/SigninForm";
import SignupForm from "../Components/Auth/SignupForm";
import MainLayout from "../Components/Pages/MainLayout";
import ProtectedRoute from "./Protected.Routes";
import Expense from "../Components/Expense/Expense";
import Travel from "../Components/Travel/Travel";
import CustomizedDialogs from "../Components/Expense/CustomizedDialogs";
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
            {path: "payment-recived", element: <VendorInvoicingPaymentRecived />},
            {path: "debit-credit", element: <VendorInvoicingDebitCredit />},
        ]
    },
    
    
    // default wrong path
    {path: "*", element: <div>wrong url</div>},

    // tests/samples
    {path: "hello", element: <CustomizedDialogs />},
    {path: "test", element: <ProtectedRoute element={<div>Test</div>} allowedRole={['test']} />},
]