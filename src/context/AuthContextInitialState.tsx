import { AuthContextType } from "./AuthContextType.tsx";

export const AuthContextInitialState: AuthContextType = {
  loading: false,
  isLoggedIn: false,
  setLoginContext: () => {},
};
