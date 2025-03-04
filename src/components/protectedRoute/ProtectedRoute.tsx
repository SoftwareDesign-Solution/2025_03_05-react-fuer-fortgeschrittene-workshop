import { ReactNode } from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    
    const authenticated = false;
    const token = null;

    if ((!authenticated) || (!token)) {
        return <Navigate to={'/login'} />;
    }

    return children;
};

export { ProtectedRoute };