import { AiFillEye, AiOutlineUser } from "react-icons/ai";

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
import DashbordCard from "../Components/cards/DashbordCard";
import { useAllUsersQuery } from "../features/UserSlice";
import user from "../../public/user.jpg";

import AreaChartComponent from "../Components/Chart/AreaChart";
import AgeSplitChart from "../Components/Chart/AgeSplitChart";
import GenderChart from "../Components/Chart/GenderChart";
import LocationMapChart from "../Components/Chart/LocationChart";
const Dashboard = () => {
  const { data, isError, isLoading, isSuccess, error } = useAllUsersQuery();
  if (isLoading) {
    console.log("Loading...");
  }
  if (isSuccess) {
    console.log(data.user);
  }
  if (isError) {
    console.log(error);
  }
  return (
    <div className="main grid px-2 w-full ">
      <div className=" p-2 grid grid-cols-2 md:gap-5 lg:gap-5 xl:gap-5 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 justify-between gap-2  ">
        <div className=" w-full md:col-span-3 lg:col-span-3 xl:col-span-3">
          <div className="card bg-white content-start grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5 rounded-2xl">
            <DashbordCard
              number={"10,000"}
              icons={<AiFillEye />}
              total={"Total views"}
              style={"bg-gradient-to-l p-2 from-pink-500 to-pink-700"}
              persent={1.5}
            />
            <DashbordCard
              number={"950"}
              icons={<AiOutlineUser />}
              total={"Total Followers"}
              style={"bg-gradient-to-l p-2 from-orange-500 to-orange-700"}
              persent={1.5}
            />
            <DashbordCard
              number={"10,000"}
              icons={<FaHandshake />}
              total={"Total views"}
              style={"bg-gradient-to-l p-2 from-purple-500 to-purple-700"}
              persent={1.5}
            />
          </div>
          <div className="mt-5 bg-white p-5 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              <h1 className="font-bold">Marketing Performence</h1>

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
              <div className="areaChart ">
                <AreaChartComponent />
              </div>
              <div className="areaChart ">
                <AgeSplitChart />
              </div>
              <div className="areaChart ">
                <GenderChart />
              </div>
              <div className="areaChart ">
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
        <div className=" w-full grid content-start gap-5  ">
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
              <button className="flex border  text-blue-500 border-blue-500 p-1 gap-2 items-center justify-center">
                <FaSms />
              </button>
            </div>
          </div>
          <div className=" bg-white p-5 rounded-2xl">
            <h1 className="mb-5">Recent Activities</h1>
            <div className="grid gap-3">
              <h1 className="my-3 font-bold text-lg">Today</h1>
              <div className="grid grid-cols-5 justify-start items-center">
                <FaFacebook className="text-2xl text-blue-500" />
                <div className="col-span-4">
                  <h4 className="font-bold ">Facebook</h4>
                  <p>Posted a video on facebook</p>
                </div>
              </div>
              <div className="grid grid-cols-5 justify-start items-center">
                <FaInstagram className="text-2xl text-red-500" />
                <div className="col-span-4">
                  <h4 className="font-bold ">Facebook</h4>
                  <p>Posted a video on facebook</p>
                </div>
              </div>
              <div className="grid grid-cols-5 justify-start items-center">
                <FaLinkedin className="text-2xl text-blue-800" />
                <div className="col-span-4">
                  <h4 className="font-bold ">Facebook</h4>
                  <p>Posted a video on facebook</p>
                </div>
              </div>
              <div className="grid grid-cols-5 justify-start items-center">
                <FaTwitter className="text-2xl text-blue-500" />
                <div className="col-span-4">
                  <h4 className="font-bold ">Facebook</h4>
                  <p>Posted a video on facebook</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
