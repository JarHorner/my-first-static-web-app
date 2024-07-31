import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally, you can render a loading spinner or some other placeholder here
    return <div>Loading...</div>;
  }

  return auth.isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
