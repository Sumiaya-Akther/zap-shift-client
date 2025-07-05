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
import DashboardLayout from "../latouts/DashboardLayout";
import MyParcels from "../pages/dashboard/MyParcels";

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
        loader: () => fetch('./serviceCenter.json'),
        hydrateFallbackElement: <h1>loading.....</h1>
      },
      {
        path: '/sendParcel',
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>,
        loader: () => fetch('./serviceCenter.json'),
        hydrateFallbackElement: <h1>loading......</h1>
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
  },
    {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'myParcels',
        Component: MyParcels
      }
    ]
  }
]);