import { createContext, useState } from "react";
import { AuthContextType } from "./AuthContextType.tsx";
import { AuthContextInitialState } from "./AuthContextInitialState.tsx";
import { AuthContextProviderPropType } from "./AuthContextProviderPropType.tsx";

export const AuthContext = createContext<AuthContextType>(
  AuthContextInitialState,
);

export const AuthContextProvider = ({
  children,
}: AuthContextProviderPropType) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const setLoginContext = (status: boolean = false) => {
    // simulate login logic
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(status);
      setLoading(false);
    }, 1500);
  };
  return (
    <AuthContext.Provider value={{ loading, isLoggedIn, setLoginContext }}>
      {children}
    </AuthContext.Provider>
  );
};
