import { RouteObject } from "react-router-dom";
import Login from "../pages/unauthorized-pages/Login.tsx";

const UnAuthorizedRoutes: RouteObject[] = [
  {
    path: "",
    element: <Login />,
  },
  {
    path: "login",
    element: <Login />,
  },
];

export default UnAuthorizedRoutes;
