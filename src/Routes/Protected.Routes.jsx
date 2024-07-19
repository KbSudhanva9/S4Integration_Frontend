import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute =({element, allowedRole})=>{

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    // console.log(role);

    if(!token || !role){
        return <Navigate to='/' />;
    }

    if(allowedRole && !allowedRole.includes(role)){
        if(role === 'test'){
            return <Navigate to='/test' />;
        }else if(role === 'admin'){
            return <Navigate to='/admin' />;
        }else if(role === 'user'){
            return <Navigate to='/user' />;
        }
    }
    return React.cloneElement(element, { role });
}

export default ProtectedRoute;