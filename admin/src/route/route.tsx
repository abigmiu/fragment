import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/Login";

const routeConfig: RouteObject[] = [
    {
        path: "login",
        element: <LoginPage />,
    },
];

export default routeConfig;
