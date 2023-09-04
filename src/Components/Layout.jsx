import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

// Layout component represents the overall structure of the application.
const Layout = () => {
  return (
    <div className="w-screen container-fluid h-auto bg-gray-200">
      {/* Render the header section */}
      <Header />
      <div className="flex relative w-full h-full">
        {/* Render the sidebar for navigation */}
        <Sidebar />
        <div className="pl-10 pt-20 grid  min-h-screen min-w-screen w-full h-full ">
          {/* Render the main content using React Router's Outlet */}
          <Outlet />
        </div>
      </div>
      {/* Render the footer section */}
      <Footer />
    </div>
  );
};

export default Layout;
