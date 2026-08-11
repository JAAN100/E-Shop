import { Navigate } from "react-router-dom";
import React from "react";
const ProtectedRoute = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        return <Navigate to="/log-in" replace />;
    }
    return children;
}


export default ProtectedRoute;  