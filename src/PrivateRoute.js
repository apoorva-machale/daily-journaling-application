import { Navigate } from "react-router-dom";
import {React, useState} from 'react';

const PrivateRoute = ({ children }) => {
 
  if(!sessionStorage.getItem("login")){
  return <Navigate to="/" replace/>;
  }
  return children;
};
export default PrivateRoute;