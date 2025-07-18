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
import Payment from "../pages/dashboard/payment/Payment";
import PaymentHistory from "../pages/dashboard/paymentHistory/PaymentHistory";
import TrackParcel from "../pages/dashboard/trackParcel/TrackParcel";
import BeARaider from "../pages/dashboard/beARaider/BeARaider";
import PendingRiders from "../pages/dashboard/pendingRiders/PendingRiders";
import ActiveRiders from "../pages/dashboard/activeRiders/ActiveRiders";
import MakeAdmin from "../pages/dashboard/makeAdmin/MakeAdmin";
import Forbidden from "../pages/forbidden/Forbidden";
import AdminRoute from "./AdminRoute";
import AssignRider from "../pages/dashboard/assignRider/AssignRider";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayOut,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('./serviceCenter.json'),
        hydrateFallbackElement: <h1>loading.....</h1>
      },
      {
        path: 'beARider',
        element: <PrivateRoute><BeARaider></BeARaider></PrivateRoute>,
        loader: () => fetch('./serviceCenter.json'),
        hydrateFallbackElement: <h1>loading......</h1>
      },
      {
        path: '/sendParcel',
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>,
        loader: () => fetch('./serviceCenter.json'),
        hydrateFallbackElement: <h1>loading......</h1>
      },
      {
        path: 'forbidden',
        Component: Forbidden
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
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
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
        path: 'paymentHistory',
        Component: PaymentHistory
      },
      {
        path: 'track',
        Component: TrackParcel
      },
      {
        path:'assign-rider',
        element:<AdminRoute><AssignRider></AssignRider></AdminRoute>
      },
      {
        path: 'pending-riders',
        element: <AdminRoute><PendingRiders></PendingRiders></AdminRoute>
      },
      {
        path: 'active-riders',
        element: <AdminRoute><ActiveRiders></ActiveRiders></AdminRoute>
      },
      {
        path: 'makeAdmin',
        element: <AdminRoute><MakeAdmin></MakeAdmin></AdminRoute>
      }
    ]
  }
]);