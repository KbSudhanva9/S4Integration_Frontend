
import SigninForm from "../Components/Auth/SigninForm";
import SignupForm from "../Components/Auth/SignupForm";
import ProtectedRoute from "./ProtectedRoute";

export const LayoutRouting = [
    {path: "", element: <SigninForm />},
    {path: "sign-up", element: <SignupForm />},
    {path: "test", element: <ProtectedRoute element={<div>Test</div>} allowedRole={['test']} />},
    {path: "admin", element: <ProtectedRoute element={<div>Admin</div>} allowedRole={['admin']} />},
    {path: "user", element: <ProtectedRoute element={<div>User</div>} allowedRole={['user']} />},
    {path: "*", element: <div>wrong url</div>},
    
]