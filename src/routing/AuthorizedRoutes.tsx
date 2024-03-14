import { RouteObject } from "react-router-dom";
import Home from "../pages/authorized-pages/Home.tsx";

const AuthorizedRoutes: RouteObject[] = [
  {
    path: "",
    element: <Home />,
  },
  {
    path: "home",
    element: <Home />,
  },
];

export default AuthorizedRoutes;
