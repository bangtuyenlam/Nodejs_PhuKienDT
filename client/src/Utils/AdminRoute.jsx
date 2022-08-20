import React from 'react'
import {Route, Outlet, Navigate, useLocation} from 'react-router-dom';
import {getUser} from './Common';

export default function AdminRoute() {
    const auth = getUser();
  return auth["Nhanvien.Maquyen"] === null ? <Navigate to="/"/>
  : <Outlet/>
}


