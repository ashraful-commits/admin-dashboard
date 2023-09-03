import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../features/UserSlice";
const PublicGard = () => {
  const { data, isLoading, isError, error, isSuccess } = useMeQuery();
  let content;
  if (isLoading) {
    console.log("..loading");
  }
  if (isError) {
    console.log(error);
    return error && <Navigate to="/login" />;
  }
  if (isSuccess) {
    return data?.user ? <Navigate to="/" /> : <Outlet />;
    // return content;
  }
};
export default PublicGard;
