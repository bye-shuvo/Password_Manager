import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from './router'
import { AppProvider } from "./context";


ReactDOM.createRoot(document.getElementById("root")).render(
  <AppProvider>
    <RouterProvider router={Router} />
  </AppProvider>
);