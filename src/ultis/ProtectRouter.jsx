import React from 'react'
import { useSelector } from "react-redux"
import { getUserInfo } from "../redux/selector"
import { Navigate, Outlet } from "react-router-dom"

const ProtectRouter = () => {
    const auth = useSelector(getUserInfo)
    if(auth){
      return <Outlet />;
    } else {
      return <Navigate to="/login" replace />;
    }
}

export default ProtectRouter;

