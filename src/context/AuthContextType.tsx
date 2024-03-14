export interface AuthContextType {
  loading: boolean;
  isLoggedIn: boolean;
  setLoginContext: (status: boolean) => void;
}
