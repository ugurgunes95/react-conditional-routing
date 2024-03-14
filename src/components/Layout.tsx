import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import LoadingComponent from "./LoadingComponent.tsx";

const Layout = () => {
  const { loading } = useContext(AuthContext);
  return <main>{loading ? <LoadingComponent /> : <Outlet />}</main>;
};

export default Layout;
