# React JS Conditional Routing Logic Implementation

## Setup

- First things first we need to create our basic react application. In order to do that, open a terminal in a preferred location on your pc and run this command: `npm create vite@latest`.

  > Note that; in this example I have used vite. But you can also use create-react-app etc.

- After the command above it will ask you for a project name, framework and variant. I am going to use TypeScript React template.
  ![Like this](/public/img1.png)

- When you've created the project run this command to all the install dependencies and react-router;

  ```console
  npm install && npm install react-router-dom@latest
  ```

  or if you're using yarn;

  ```console
  yarn install && yarn add react-router-dom@latest
  ```

- Now I am going to delete unnecessary files etc. At the end of the setup section your file tree will look like this:

  ```console
  ugur@gunes:~/Development/reactjs/test$ tree --dirsfirst
  .
  ├── public
  ├── src
  │   ├── index.css
  │   ├── Layout.tsx
  │   ├── main.tsx
  │   └── vite-env.d.ts
  ├── index.html
  ├── package.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  └── vite.config.ts

  3 directories, 9 files
  ```

- That's it for our basic setup.

## Configuration

So let's create our pages which we're going to use in the next steps.

### Creating Pages

- I'll create a directory named `pages` in `src` folder. And inside of that directory I'll also create two other directories just to make the situation more clear.
- I am creating `AuthorizedPages` and `UnauthorizedPages` directories in the `src/pages` folder.
- And I will just create two components; one for `AuthorizedPages(Home.tsx)` and one for `UnauthorizedPages(Login.tsx)`.

- ```javascript
  // Home.tsx

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
  ```

- ```javascript
  // Login.tsx

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
  ```

- Here's how it looks at the end:

  ```console
  .
  ├── public
  ├── src
  │   ├── pages
  │   │   ├── AuthorizedPages
  │   │   │   └── Home.tsx
  │   │   └── UnauthorizedPages
  │   │       └── Login.tsx
  │   ├── index.css
  │   ├── Layout.tsx
  │   ├── main.tsx
  │   └── vite-env.d.ts
  ├── index.html
  ├── package.json
  ├── tsconfig.json
  ├── tsconfig.node.json
  └── vite.config.ts

  6 directories, 11 files
  ```

- Check the page files' content on the github repository.

### Creating AuthContext

In this section we'll create AuthContext. I will not implement authentication logic to make this article short and less complicated. Instead we'll just simulate it.

- I am creating a directory called `context` under our `src` folder.
- In this directory we'll create 4 files: `AuthContext.tsx`, `AuthContextType.tsx`, `AuthContextProviderPropType.tsx` and `AuthContextInitialState.tsx`.
- Creating 4 different files is not necessary but I just like to seperate them.
- File's contents will be like that:

  ```javascript
  // AuthContext.tsx

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
  ```

  ```javascript
  // AuthContextType.tsx

  export interface AuthContextType {
    loading: boolean;
    isLoggedIn: boolean;
    setLoginContext: (status: boolean) => void;
  }
  ```

  ```javascript
  // AuthContextProviderPropType.tsx
  import React from "react";

  export interface AuthContextProviderPropType {
    children: React.ReactNode;
  }
  ```

  ```javascript
  // AuthContextInitialState.tsx
  import { AuthContextType } from "./AuthContextType.tsx";

  export const AuthContextInitialState: AuthContextType = {
    loading: false,
    isLoggedIn: false,
    setLoginContext: () => {},
  };
  ```

- The end of context setup... it's pretty straight forward stuff.

### Creating Routing Files

Now it's time to create routing part. As I said before I like to keep files seperately. Let's create our routing files. In order to do that I'll create 1 directory and 3 files in it.

- Create `routing` directory under the `src` folder.
- In the `routing` folder create 3 files and name them as you wish. I'll name them; `AuthorizedRoutes.tsx`, `UnAuthorizedRoutes.tsx` and `BaseRouting.tsx`.
- Let's now create the content for theses files:

  ```javascript
  // AuthorizedRoutes.tsx
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
  ```

  ```javascript
  // UnAuthorizedRoutes.tsx
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
  ```

  ```javascript
  // BaseRouting.tsx
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
  ```

- What we did? Let's review...
- `BaseRouting.tsx` file is our main routing file. Inside of that we have our `Layout` component which is like wrapper for our app.
- But the children of our main route is depends to the isLoggedIn state which we've created in out context part.
- If there is a logged in user; we'll render the app with routes requires authorization, if there isn't we'll render the app with unauthorized routes.

- This way we're also make Login route not accessible if user is logged in.

## Conclusion

That's it. I am not exactly sure if this approach is convenient, but I am pretty sure that I'll use it in my next projects. Hope it helps you people.

[Github Repo](https://)
