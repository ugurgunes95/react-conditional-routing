import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import RoutingProvider from "./routing/BaseRouting.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <RoutingProvider />
  </AuthContextProvider>,
);
