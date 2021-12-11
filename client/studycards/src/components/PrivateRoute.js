import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../contextAPI/appContext";

const PrivateRoute = ({ children }) => {
  const { user, loadUser, isAuthenticated } = useGlobalContext();
  useEffect(() => {
    loadUser();
  }, []);
  console.log(user);

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
