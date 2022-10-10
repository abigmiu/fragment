import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginPage from "@/pages/Login";
import Tag from "@/pages/Tag";
import App from "@/App";

interface IRouteObject extends RouteObject {
    auth?: boolean;
}

const routeConfig: IRouteObject[] = [
    {
        path: "/login",
        element: <LoginPage />,
        auth: false,
    },
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/tag",
                element: <Tag />,
            },
        ],
    },
];

export default createBrowserRouter(routeConfig);
