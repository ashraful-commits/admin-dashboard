import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/UserSlice";
const PublicGuard = () => {
  const { data, isLoading, isError, isSuccess, error } = useMeQuery();

  if (isLoading) {
    // While loading, you can return a loading indicator or null.
    return null; // Or return a loading spinner or message.
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  if (isSuccess) {
    // If the query is successful, you can check the user data and render content accordingly.
    if (data?.user) {
      // User is authenticated, navigate to the home page.
      return <Navigate to="/" />;
    } else {
      // User is not authenticated, render the child routes using Outlet.
      return <Outlet />;
    }
  }
};

export default PublicGuard;
