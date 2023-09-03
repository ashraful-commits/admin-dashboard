import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const DashboardCard = ({ icons, number, total, persent, style }) => {
  return (
    <div className="w-full">
      <div
        className={`rounded-2xl flex justify-around items-center h-[17vh] ${style}`}
      >
        <div className="  items-center flex p-2 gap-2  flex-col">
          <span className="bg-white text-4xl rounded-md">{icons}</span>
          <span className="text-lg font-bold text-white my-1">{number}</span>
          <span className="text-gray-200 text-sm  font-semibold">{total}</span>
        </div>
        <div className="  flex justify-center">
          <span className="text-white flex items-center gap-2">
            <AiOutlineArrowUp />
            {persent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
