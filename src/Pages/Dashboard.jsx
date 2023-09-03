import {
  FaFacebook,
  FaHandshake,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaPhone,
  FaPlus,
  FaSms,
  FaTwitter,
} from "react-icons/fa";
import { AiFillEye, AiOutlineUser } from "react-icons/ai";
import DashboardCard from "../Components/cards/DashboardCard";
import { useAllUsersQuery } from "../features/UserSlice";
import user from "../../public/user.jpg";

import AreaChartComponent from "../Components/Chart/AreaChart";
import AgeSplitChart from "../Components/Chart/AgeSplitChart";
import GenderChart from "../Components/Chart/GenderChart";
import LocationMapChart from "../Components/Chart/LocationChart";

const Dashboard = () => {
  const { data, isError, isLoading, isSuccess, error } = useAllUsersQuery();

  return (
    <div className="main grid px-2 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      <div className="w-full col-span-full lg:col-span-3 xl:col-span-3">
        <div className="card mx-3 bg-white content-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 rounded-2xl">
          <DashboardCard
            number={"10,000"}
            icons={<AiFillEye />}
            total={"Total views"}
            style="bg-gradient-to-l from-[#FF3366] to-[#FF33FF] p-2"
            persent={1.5}
          />
          <DashboardCard
            number={"950"}
            icons={<AiOutlineUser />}
            total={"Total Followers"}
            style="bg-gradient-to-l from-[#FF9900] to-[#FF9966] p-2"
            persent={1.5}
          />
          <DashboardCard
            number={"10,000"}
            icons={<FaHandshake />}
            total={"Total views"}
            style="bg-gradient-to-l from-[#6600FF] to-[#9966FF] p-2"
            persent={1.5}
          />
        </div>
        <div className="mt-5 bg-white p-3 m-3 md:p-2 lg:p-5 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <h1 className="font-bold">Marketing Performance</h1>
            <div className="grid justify-end grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-2">
              <select className="border border-blue-400" id="">
                <option className="w-full" value="">
                  <FaFacebook /> Facebook
                </option>
                <option className="w-full" value="">
                  <FaInstagram /> Instagram
                </option>
                <option className="w-full" value="">
                  <FaLinkedin /> LinkedIn
                </option>
                <option className="w-full" value="">
                  <FaTwitter /> Twitter
                </option>
              </select>
              <select className="border border-blue-400" name="" id="">
                <option value="">Monthly</option>
                <option value="">Weekly</option>
                <option value="">Yearly</option>
              </select>
            </div>
          </div>
          <div className="Chart grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
            <div className="areaChart">
              <AreaChartComponent />
            </div>
            <div className="areaChart">
              <AgeSplitChart />
            </div>
            <div className="areaChart">
              <GenderChart />
            </div>
            <div className="areaChart">
              <LocationMapChart
                data={[
                  {
                    id: 1,
                    name: "North",
                    lat: 40.7128,
                    lng: -74.006,
                    count: 250,
                  },
                  // Other location objects
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full col-span-full lg:col-span-1 xl:col-span-1">
        <div className="bg-white grid text-center justify-center w-full rounded-2xl p-5">
          <img className="w-[50px] shrink-0 m-auto" src={user} alt="" />
          <h1>Mohammad Ashraf</h1>
          <p className="flex items-center m-auto gap-3">
            <FaLocationArrow />
            Location
          </p>
          <div className="grid grid-cols-2 mt-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col">
              <span className="font-bold">15789</span>
              <span>Post</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">5000</span>
              <span>Follower</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">200</span>
              <span>Following</span>
            </div>
          </div>
          <div className="flex items-center flex-col md:flex-row lg:flex-row mt-5 gap-2 justify-center">
            <button className="flex border text-xs text-blue-500 border-blue-500 p-1 gap-2 items-center justify-center">
              <FaPlus /> Add to list
            </button>
            <button className="flex border text-blue-500 border-blue-500 p-1 gap-2 items-center justify-center">
              <FaPhone />
            </button>
            <button className="flex border text-blue-500 border-blue-500 p-1 gap-2 items-center justify-center">
              <FaSms />
            </button>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl mt-5">
          <h1 className="mb-5">Recent Activities</h1>
          <div className="grid gap-3">
            <h1 className="my-3 font-bold text-lg">Today</h1>
            <div className="grid grid-cols-5 justify-start items-center">
              <FaFacebook className="text-2xl text-blue-500" />
              <div className="col-span-4">
                <h4 className="font-bold ">Facebook</h4>
                <p>Posted a video on Facebook</p>
              </div>
            </div>
            {/* Add more recent activities */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
