import {
  createBrowserRouter,
} from "react-router";
import MainLayOut from "../latouts/MainLayOut";
import Home from "../pages/home/Home";
import AuthLayout from "../latouts/AuthLayout";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index:true,
        Component: Home
      }
    ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children: [
      {
        path:'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  }
]);