import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "antd/dist/antd.css";
import { RouterProvider} from "react-router-dom";
import router from './route/route'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
