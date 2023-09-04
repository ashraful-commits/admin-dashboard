import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/UserSlice";

const PrivateGuard = () => {
  const { data, isLoading, isError, error, isSuccess } = useMeQuery();

  if (isLoading) {
    // While loading user data, you can display a loading indicator.
    return <h1>Loading...</h1>;
  }

  if (error) {
    // If there's an error fetching user data, navigate to the login page.
    return <Navigate to="/login" />;
  }

  if (isSuccess) {
    return data?.user ? <Outlet /> : <Navigate to="/login" />;
  }
};

export default PrivateGuard;
