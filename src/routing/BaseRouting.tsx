import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout.tsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import AuthorizedRoutes from "./AuthorizedRoutes.tsx";
import UnAuthorizedRoutes from "./UnAuthorizedRoutes.tsx";
import ErrorComponent from "../components/ErrorComponent.tsx";

const RoutingProvider = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorComponent />,
      children: isLoggedIn ? [...AuthorizedRoutes] : [...UnAuthorizedRoutes],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RoutingProvider;
