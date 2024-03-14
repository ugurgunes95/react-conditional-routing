import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";

const Home = () => {
  const { setLoginContext } = useContext(AuthContext);
  return (
    <section>
      <h1>Home Page</h1>
      <button onClick={() => setLoginContext(false)}>Logout</button>
    </section>
  );
};

export default Home;
