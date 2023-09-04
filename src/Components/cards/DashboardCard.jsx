import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

// DashboardCard component displays information in a styled card.
// Props:
// - icons: Icon component for display.
// - number: Main numerical value to display.
// - total: Additional information to display below the number.
// - persent: Percentage or change information.
// - style: Additional CSS classes for styling.
const DashboardCard = ({ icons, number, total, persent, style }) => {
  return (
    <div className="w-full">
      <div
        className={`rounded-2xl flex justify-around items-center h-[17vh] ${style}`}
      >
        <div className="  items-center flex p-2 gap-2  flex-col">
          {/* Display the provided icon */}
          <span className="bg-white text-4xl rounded-md">{icons}</span>
          {/* Display the main numerical value */}
          <span className="text-lg font-bold text-white my-1">{number}</span>
          {/* Display additional information */}
          <span className="text-gray-200 text-sm  font-semibold">{total}</span>
        </div>
        <div className="  flex justify-center">
          <span className="text-white flex items-center gap-2">
            {/* Display an arrow icon and percentage or change information */}
            <AiOutlineArrowUp />
            {persent}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
