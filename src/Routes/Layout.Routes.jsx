
import { Children } from "react";
import SigninForm from "../Components/Auth/SigninForm";
import SignupForm from "../Components/Auth/SignupForm";
import MainLayout from "../Components/Pages/MainLayout";
import ProtectedRoute from "./Protected.Routes";
import Expense from "../Components/Expense/Expense";
import Travel from "../Components/Travel/Travel";

export const LayoutRouting = [
    {path: "", element: <SigninForm />},
    {path: "sign-up", element: <SignupForm />},
    {path: "test", element: <ProtectedRoute element={<div>Test</div>} allowedRole={['test']} />},
    {path: "admin", element: <ProtectedRoute element={<MainLayout />} allowedRole={['Admin']} /> ,
        children : [
            {path: "expense", element: <ProtectedRoute element={<Expense />}/>},
            {path: "travel", element: <ProtectedRoute element={<Travel />} />},
        ]
    },
    {path: "user", element: <ProtectedRoute element={<div>User</div>} allowedRole={['user']} />},
    {path: "*", element: <div>wrong url</div>},
    
]