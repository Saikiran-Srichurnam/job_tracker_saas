import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const ProtectedRoute = () => {
  const {isAuthenticated, loading } = useAuth()

  // While checking user (API call running)
  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // Not logged in → redirect to login
  if(!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → allow access
  return <Outlet />
}

export default ProtectedRoute