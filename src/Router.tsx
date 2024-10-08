import { createHashRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";
import { SideLayout } from "./components/layouts/SideLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Empty from "./pages/Empty";
import Topnav from "./pages/Topnav";
import Sidenav from "./pages/Sidenav";
import Forms from "./pages/Forms";
import Tables from "./pages/Tables";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Widgets from "./pages/Widgets";
import Components from "./pages/Components";
import Notification from "./pages/Notification";
import { Profile } from "./pages/Profile";
import { SecondaryChart } from "./pages/SecondaryChart";
import { Settings } from "./pages/Settings";
import { SensorDataContextProvider } from "./contexts/SensorDataContext";

// createBrowserRouter
export const router = createHashRouter([
  {
    path: "/",
    element: <Applayout />,
    children: [
      {
        path: "",
        element: (
          <SensorDataContextProvider>
            <Dashboard />
          </SensorDataContextProvider>
        ),
      },
      {
        path: "layout/topnav",
        element: <Topnav />,
      },
      {
        path: "forms",
        element: <Forms />,
      },
      {
        path: "table",
        element: <Tables />,
      },
      {
        path: "widgets",
        element: <Widgets />,
      },
      {
        path: "components",
        element: <Components />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "empty",
        element: <Empty />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "secondarychart",
        element: <SecondaryChart />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
    ],
  },
  {
    path: "/layout/sidenav",
    element: <SideLayout />,
    children: [
      {
        path: "",
        element: <Sidenav />,
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]);
