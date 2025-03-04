import { RouteObject } from "react-router";
import App from "../App";
import { authRoutes } from "@/features/auth";
import { productsRoutes } from "@/features/products";
import { ProtectedRoute } from "@/components/protectedRoute/ProtectedRoute";
import { AdminPage } from "@/pages/adminpage/AdminPage";
import { NotFoundPage } from "@/pages/notfoundpage/NotFoundPage";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            ...authRoutes,
            ...productsRoutes,
            {
                path: "/admin",
                element: (
                    <ProtectedRoute>
                        <AdminPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <NotFoundPage />,
            }
        ]
    }
];

export { routes };