import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/UserSlice";
const PublicGuard = () => {
  const { data, isLoading, isError, isSuccess, error } = useMeQuery();

  if (isLoading) {
    // While loading, you can return a loading indicator or null.
    return <h1>Loading...</h1>; // Or return a loading spinner or message.
  }

  if (error) {
    return <Outlet />;
  }

  if (isSuccess) {
    return data?.user ? <Navigate to="/" /> : <Outlet />;
  }
};

export default PublicGuard;
