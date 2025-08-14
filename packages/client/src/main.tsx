import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/base.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
