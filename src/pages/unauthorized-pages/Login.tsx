import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";

const Login = () => {
  const { setLoginContext } = useContext(AuthContext);
  return (
    <section>
      <h1>Login Page</h1>
      <button onClick={() => setLoginContext(true)}>Login</button>
    </section>
  );
};

export default Login;
