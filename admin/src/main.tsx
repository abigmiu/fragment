import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "antd/dist/antd.css";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import router from './route/route'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);
