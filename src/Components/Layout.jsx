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

        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
