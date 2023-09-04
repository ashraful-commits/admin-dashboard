import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/UserSlice";

const PrivateGuard = () => {
  const { data, isLoading, isError, error } = useMeQuery();

  if (isLoading) {
    // While loading user data, you can display a loading indicator.
    return <h1>Loading...</h1>;
  }

  if (error) {
    // If there's an error fetching user data, navigate to the login page.
    return <Navigate to="/login" />;
  }

  // Assuming data?.user indicates an authenticated user.
  if (!data?.user) {
    // If the user is not authenticated, navigate to the login page.
    return <Navigate to="/login" />;
  }

  // If the user is authenticated, render the child routes.
  return <Outlet />;
};

export default PrivateGuard;
