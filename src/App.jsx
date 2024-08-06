import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Import pages
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

import AppLayout from "./ui/AppLayout";

// Import global styles
import GlobalStyles from "./styles/GlobalStyles";

// Define application routes

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Navigate replace to="dashboard" />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "bookings",
          element: <Bookings />,
        },
        {
          path: "cabins",
          element: <Cabins />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
