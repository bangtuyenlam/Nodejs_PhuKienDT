import React from 'react'
import {Route, Outlet, Navigate, useLocation} from 'react-router-dom';
import {getToken} from './Common';


export const PrivateRoute = () => {
    const token = getToken();
    console.log(token);
    const location = useLocation();
    return (token === null) ? <Navigate to="/login"/> : <Outlet/>
    
}


