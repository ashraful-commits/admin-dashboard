import logo from "../../public/devloper ashraful.png";
import user from "../../public/user.jpg";
import { AiFillBell } from "react-icons/ai";

const Header = () => {
  return (
    <div className="w-full px-4 py-2 flex justify-between bg-orange-200 items-center">
      <div className="logo w-[20%] flex gap-5  justify-between ">
        <img className="w-[30px] shrink-0 h-[30px]" src={logo} alt="Logo" />
      </div>
      <div className="search w-[70%] flex justify-start">
        <input
          className="w-full rounded-full py-1 focus:outline-none px-4 text-gray-900 bg-white"
          type="search"
          placeholder="Search"
        />
      </div>
      <div className="profile-notification w-[20%] flex justify-end items-center gap-5 ">
        <div className="notification">
          <button>
            <AiFillBell />
          </button>
        </div>
        <div className="profile flex rounded-full overflow-hidden mr-3">
          <img
            className="w-[30px] shrink-0 rounded-full h-[30px]"
            src={user}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
