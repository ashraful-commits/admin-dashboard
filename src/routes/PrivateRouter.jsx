import Layout from "../Components/Layout";
import Dashboard from "../Pages/Dashboard";
import Permissions from "../Pages/Permissions";
import Role from "../Pages/Role";
import User from "../Pages/User";

const PrivateRouter = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/permission",
        element: <Permissions />,
      },
      {
        path: "/role",
        element: <Role />,
      },
      {
        path: "/user",
        element: <User />,
      },
    ],
  },
];

export default PrivateRouter;
