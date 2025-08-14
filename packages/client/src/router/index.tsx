import { createHashRouter } from "react-router-dom";
import Home from "../pages";
import LoginOrRegister from "../pages/loginOrRegister";
import Edit from "../pages/edit";

export const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/loginOrRegister",
        element: <LoginOrRegister />,
      },
      {
        path: "/edit",
        element: <Edit />,
      },
    ],
  },
]);
