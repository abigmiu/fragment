import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/Login";
import Home from "@/pages/Home";
import Tag from "@/pages/Tag";

const routeConfig: RouteObject[] = [
    {
        path: "login",
        element: <LoginPage />,
    },
    {
        path: "/",
        element: <Home />,
        children: [
            {
                path: "/tag",
                element: <Tag />,
            },
        ],
    },
];

export default routeConfig;
