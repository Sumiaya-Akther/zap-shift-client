import {
  createBrowserRouter,
} from "react-router";
import MainLayOut from "../latouts/MainLayOut";
import Home from "../pages/home/Home";
import AuthLayout from "../latouts/AuthLayout";
import Login from "../pages/authentication/login/Login";
import Register from "../pages/authentication/register/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";

 export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index:true,
        Component: Home
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json')
      },
      {
        path: '/sendParcel',
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>,
        loader: () => fetch('./serviceCenter.json')
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