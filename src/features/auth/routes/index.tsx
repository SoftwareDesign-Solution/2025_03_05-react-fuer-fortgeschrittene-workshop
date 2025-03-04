import { RouteObject } from "react-router";
import { LoginPage } from "../pages/loginpage/LoginPage";
import { RegisterPage } from "../pages/registerpage/RegisterPage";

const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
];

export { routes };