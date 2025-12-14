import { Navigate } from "react-router-dom";

const ProtectedRoute =  ({children}:any)=> {
    const token = localStorage.getItem("token");
    if (!token || token.length<=0) {
        return <Navigate to="/admin/login"/>;       
    }

    return children
}

export default ProtectedRoute;