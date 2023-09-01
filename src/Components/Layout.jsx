import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="w-screen container-fluid h-auto bg-gray-200">
      <Header />
      <div className="flex relative w-full h-full">
        <Sidebar />
        <div className="pl-10 pt-20 grid  min-h-screen min-w-screen w-full h-full ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
