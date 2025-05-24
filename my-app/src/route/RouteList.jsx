import React from "react";
 
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import CreateCardio from "../pages/Cardio/CreateCardio";
import GetCardio from "../pages/Cardio/GetCardio";
import UpdateCardio from "../pages/Cardio/UpdateCardio";
import CreateResistance from "../pages/Resistance/CreateResistance";
import GetResistance from "../pages/Resistance/GetResistance";
import UpdateResistance from "../pages/Resistance/UpdateResistance";

const RouteList = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/cardio/create",
    element: <CreateCardio />,
  },
  {
    path: "/dashboard/cardio/getAll",
    element: <GetCardio />,
  },
  {
    path: "/dashboard/cardio/update/:cardioId",
    element: <UpdateCardio />,
  },
  {
    path:"dashboard/resistance/create",
    element: <CreateResistance />,
  },
  {
    path:"dashboard/resistance/getAll",
    element: <GetResistance />,
  },
  {
    path:"dashboard/resistance/update/:resistanceId",
    element: <UpdateResistance />,
  }
 
]

export default RouteList;