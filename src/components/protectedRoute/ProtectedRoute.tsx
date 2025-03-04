import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { selectAuthenticated, selectToken } from "@/features/auth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    
    const authenticated = useSelector(selectAuthenticated);
    const token = useSelector(selectToken);

    if ((!authenticated) || (!token)) {
        return <Navigate to={'/login'} />;
    }

    return children;
};

export { ProtectedRoute };