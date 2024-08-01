
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
    {path: "home", element: <ProtectedRoute element={<div>User</div>} allowedRole={['user']} />},

    // vendor onbording
    {path: "vendor-onbording-login", element: <VendorOnbordingLogin />,},
    {path: "vendor-onbording", 
        children: [
            {path: "vendor-details", element: <VendorOnbording />},
        ]
    },
    {path: "vendor-onbording-sign-up", element: <VendorOnbordingSignup />},
    {path: "vendor-track-status", element: <VendorTrackStatus />},
    
    
    
    // default wrong path
    {path: "*", element: <div>wrong url</div>},

    // tests/samples
    {path: "hello", element: <CustomizedDialogs />},
    {path: "test", element: <ProtectedRoute element={<div>Test</div>} allowedRole={['test']} />},
]