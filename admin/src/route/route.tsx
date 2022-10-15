import { createBrowserRouter, RouteObject } from "react-router-dom";
import LoginPage from "@/pages/Login";
import Tag from "@/pages/Tag";
import App from "@/App";
import Post from '@/pages/PostList'
import PostEdit from '@/pages/PostEdit'

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
            {
                path: '/post',
                element: <Post/>
            },
            {
                path: '/post/edit',
                element: <PostEdit/>
            }
        ],
    },
];

export default createBrowserRouter(routeConfig);
