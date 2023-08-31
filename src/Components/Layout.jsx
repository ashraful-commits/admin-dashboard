import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="w-screen h-auto bg-gray-200">
      <Header />
      <div className="flex relative w-full h-full">
        <Sidebar />
        <div className="ml-10 mt-20 grid items-center w-full h-full justify-center">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
