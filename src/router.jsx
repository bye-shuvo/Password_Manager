import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./login-page";
import App from "./App";

const Router = createBrowserRouter(
    [
        {
            path: "/",
            element: <LoginPage />
        },
        {
            path: "/home",
            element: <App />
        }       
    ]
);

export default Router;