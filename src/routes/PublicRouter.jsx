import Login from "../Pages/Login";
import Register from "../Pages/Register";

const PublicRouter = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default PublicRouter;
