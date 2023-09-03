import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/UserSlice";

const PrivateGard = () => {
  const { data, isLoading, isError } = useMeQuery();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <Navigate to="/login" />;
  }

  // Assuming data?.user indicates an authenticated user.
  if (!data?.user) {
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child routes.
  return <Outlet />;
};

export default PrivateGard;
