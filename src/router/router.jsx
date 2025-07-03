import {
  createBrowserRouter,
} from "react-router";
import MainLayOut from "../latouts/MainLayOut";
import Home from "../pages/home/Home";

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
]);